import { applySetCookies } from "better-auth/cookies"
import { afterEach, describe, expect, it } from "vitest"

import { cleanupTestUser } from "../helpers/cleanupTestUser"
import { createTestAuth } from "../helpers/createTestAuth"
import { deleteUserByEmail } from "../helpers/deleteUserByEmail"
import { generateTestTOTPCode } from "../helpers/generateTestTOTPCode"
import { seedPasswordTestUser } from "../helpers/seedPasswordTestUser"
import { seedTestPasskey } from "../helpers/seedTestPasskey"
import { seedTestTOTPSecret } from "../helpers/seedTestTOTPSecret"
import { testUser } from "../helpers/testUser"

const TEST_PASSWORD = "bootstrap-password-1234"
const TEST_TOTP_SECRET = "test-totp-secret-value"
const WRONG_TOTP_CODE = "000000"
const SECOND_USER_EMAIL = "second-user@example.com"
const UNKNOWN_USER_EMAIL = "unknown-user@example.com"

const FORBIDDEN = "FORBIDDEN"
const UNAUTHORIZED = "UNAUTHORIZED"

/**
 * password サインインし、`twoFactor` プラグインが発行した pending cookie を
 * 次のリクエスト用の `Cookie` ヘッダーへ変換して返す。
 * @param auth `createTestAuth` で生成したインスタンス
 * @returns 第2要素の verify エンドポイントへそのまま渡せる headers
 */
const signInAndGetSecondFactorHeaders = async (
  auth: Awaited<ReturnType<typeof createTestAuth>>,
): Promise<Headers> => {
  const signInResult = await auth.api.signInEmail({
    body: { email: testUser.email, password: TEST_PASSWORD },
    returnHeaders: true,
  })

  const headers = new Headers()
  applySetCookies(headers, signInResult.headers.getSetCookie())

  return headers
}

describe("認証", () => {
  afterEach(async () => {
    await cleanupTestUser()
    await deleteUserByEmail(SECOND_USER_EMAIL)
  })

  // SIGN_UP_ALLOWED_EMAIL には testUser.email を設定しておく(.env.example 参照)
  describe("サインアップ", () => {
    it("許可されたメールアドレスかつ users が 0 件なら成功する", async () => {
      const auth = await createTestAuth()

      const { user } = await auth.api.signUpEmail({
        body: { email: testUser.email, name: testUser.name, password: TEST_PASSWORD },
      })

      expect(user.email).toBe(testUser.email)
    })

    it("許可されたメールアドレスと一致しない場合は拒否される", async () => {
      const auth = await createTestAuth()

      const signUp = auth.api.signUpEmail({
        body: { email: SECOND_USER_EMAIL, name: "Second User", password: TEST_PASSWORD },
      })

      await expect(signUp).rejects.toMatchObject({ status: FORBIDDEN })
    })

    it("許可されたメールアドレスでも users が既に存在する場合は拒否される", async () => {
      await seedPasswordTestUser(TEST_PASSWORD)
      const auth = await createTestAuth()

      const signUp = auth.api.signUpEmail({
        body: { email: testUser.email, name: testUser.name, password: TEST_PASSWORD },
      })

      await expect(signUp).rejects.toMatchObject({ status: FORBIDDEN })
    })
  })

  describe("password でのサインイン", () => {
    it("第2要素未登録なら成功する", async () => {
      await seedPasswordTestUser(TEST_PASSWORD)
      const auth = await createTestAuth()

      const { user } = await auth.api.signInEmail({
        body: { email: testUser.email, password: TEST_PASSWORD },
      })

      expect(user.email).toBe(testUser.email)
    })

    it("passkey を登録済みでも第2要素(TOTP)が未登録なら password だけで成功する", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestPasskey(userId)
      const auth = await createTestAuth()

      const { user } = await auth.api.signInEmail({
        body: { email: testUser.email, password: TEST_PASSWORD },
      })

      expect(user.email).toBe(testUser.email)
    })

    it("第2要素(TOTP)が有効なら password だけでは完結せず twoFactorRedirect になる", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)
      const auth = await createTestAuth()

      const result = await auth.api.signInEmail({
        body: { email: testUser.email, password: TEST_PASSWORD },
        returnHeaders: true,
      })

      expect(result.response).toMatchObject({ twoFactorRedirect: true })
    })

    it("存在しないメールアドレスは認証エラーになる", async () => {
      const auth = await createTestAuth()

      const signIn = auth.api.signInEmail({
        body: { email: UNKNOWN_USER_EMAIL, password: TEST_PASSWORD },
      })

      await expect(signIn).rejects.toMatchObject({ status: UNAUTHORIZED })
    })
  })

  describe("TOTP での第2要素", () => {
    it("正しいコードでフルセッションを取得できる", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)
      const auth = await createTestAuth()

      const headers = await signInAndGetSecondFactorHeaders(auth)

      const code = generateTestTOTPCode(TEST_TOTP_SECRET)
      const verifyResult = await auth.api.verifyTOTP({ body: { code }, headers })

      expect(verifyResult.user.email).toBe(testUser.email)
    })

    it("誤ったコードは拒否される", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)
      const auth = await createTestAuth()

      const headers = await signInAndGetSecondFactorHeaders(auth)

      const verify = auth.api.verifyTOTP({ body: { code: WRONG_TOTP_CODE }, headers })

      await expect(verify).rejects.toMatchObject({ status: UNAUTHORIZED })
    })

    it("第2要素が未登録のユーザーに対する verifyTOTP は拒否される", async () => {
      await seedPasswordTestUser(TEST_PASSWORD)
      const auth = await createTestAuth()

      const verify = auth.api.verifyTOTP({ body: { code: WRONG_TOTP_CODE } })

      await expect(verify).rejects.toMatchObject({ status: UNAUTHORIZED })
    })

    it("同じ challenge は一度しか消費できず、2回目の verifyTOTP は拒否される(passkey との競合防止の前提を公開 endpoint で検証)", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)
      const auth = await createTestAuth()

      const headers = await signInAndGetSecondFactorHeaders(auth)
      const code = generateTestTOTPCode(TEST_TOTP_SECRET)

      const firstVerify = await auth.api.verifyTOTP({ body: { code }, headers })
      expect(firstVerify.user.email).toBe(testUser.email)

      const secondVerify = auth.api.verifyTOTP({ body: { code }, headers })
      await expect(secondVerify).rejects.toMatchObject({ status: UNAUTHORIZED })
    })
  })
})
