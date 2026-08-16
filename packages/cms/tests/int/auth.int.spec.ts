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
const SECOND_USER_EMAIL = "second-user@example.com"
const UNKNOWN_USER_EMAIL = "unknown-user@example.com"
const TEST_TOTP_SECRET = "test-totp-secret-1234567890"

const FORBIDDEN = "FORBIDDEN"
const UNAUTHORIZED = "UNAUTHORIZED"

const COOKIE_NAME_VALUE_PAIR_INDEX = 0

/**
 * `returnHeaders: true` で得たレスポンスの `Set-Cookie` を、次のリクエストの
 * `Cookie` ヘッダーへ変換する。2FA の pending cookie を次の verifyTOTP 呼び出しへ
 * 引き継ぐために使う。
 * @param headers 直前のレスポンスヘッダー
 * @returns 次のリクエストに渡す Headers
 */
const toRequestCookieHeaders = (headers: Headers): Headers => {
  const cookiePairs = headers
    .getSetCookie()
    .map((cookie) => cookie.split(";")[COOKIE_NAME_VALUE_PAIR_INDEX])

  return new Headers({ cookie: cookiePairs.join("; ") })
}

type TwoFactorRedirectResponse = { twoFactorRedirect: true }

/**
 * `twoFactor` プラグインの after hook が差し替えるレスポンス
 * (`{ twoFactorRedirect: true, twoFactorMethods }`)かどうかを判定する。
 * `auth.api.signInEmail` の型定義はプラグインによる差し替えを表現しないため、
 * 実際の使用箇所に合わせた最小構造型で判定する。
 * @param value 判定対象のレスポンス
 * @returns 2FA チャレンジへのリダイレクトなら true
 */
const isTwoFactorRedirect = (value: unknown): value is TwoFactorRedirectResponse =>
  typeof value === "object" &&
  value !== null &&
  "twoFactorRedirect" in value &&
  value.twoFactorRedirect === true

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
    it("passkey 未登録のユーザーは成功する", async () => {
      await seedPasswordTestUser(TEST_PASSWORD)
      const auth = await createTestAuth()

      const { user } = await auth.api.signInEmail({
        body: { email: testUser.email, password: TEST_PASSWORD },
      })

      expect(user.email).toBe(testUser.email)
    })

    it("passkey 登録済みのユーザーは拒否される", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestPasskey(userId)
      const auth = await createTestAuth()

      const signIn = auth.api.signInEmail({
        body: { email: testUser.email, password: TEST_PASSWORD },
      })

      await expect(signIn).rejects.toMatchObject({ status: FORBIDDEN })
    })

    it("passkey 登録済みのユーザーは大文字小文字を変えたメールアドレスでも拒否される", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestPasskey(userId)
      const auth = await createTestAuth()

      const signIn = auth.api.signInEmail({
        body: { email: testUser.email.toUpperCase(), password: TEST_PASSWORD },
      })

      await expect(signIn).rejects.toMatchObject({ status: FORBIDDEN })
    })

    it("存在しないメールアドレスは passkey 判定を素通しして認証エラーになる", async () => {
      const auth = await createTestAuth()

      const signIn = auth.api.signInEmail({
        body: { email: UNKNOWN_USER_EMAIL, password: TEST_PASSWORD },
      })

      await expect(signIn).rejects.toMatchObject({ status: UNAUTHORIZED })
    })
  })

  describe("password + TOTP フォールバック", () => {
    it("TOTP 有効化済みのユーザーは password サインイン直後にフルセッションを得られない", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)
      const auth = await createTestAuth()

      const { response } = await auth.api.signInEmail({
        body: { email: testUser.email, password: TEST_PASSWORD },
        returnHeaders: true,
      })

      expect(isTwoFactorRedirect(response)).toBe(true)
    })

    it("続けて正しい TOTP コードを検証するとフルセッションが発行される", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)
      const auth = await createTestAuth()

      const signIn = await auth.api.signInEmail({
        body: { email: testUser.email, password: TEST_PASSWORD },
        returnHeaders: true,
      })

      const verify = await auth.api.verifyTOTP({
        body: { code: generateTestTOTPCode(TEST_TOTP_SECRET) },
        headers: toRequestCookieHeaders(signIn.headers),
        returnHeaders: true,
      })

      expect(verify.response.user.email).toBe(testUser.email)

      const session = await auth.api.getSession({
        headers: toRequestCookieHeaders(verify.headers),
      })

      expect(session?.user.email).toBe(testUser.email)
    })

    it("TOTP コードが誤りの場合はフルセッションが発行されない", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)
      const auth = await createTestAuth()

      const signIn = await auth.api.signInEmail({
        body: { email: testUser.email, password: TEST_PASSWORD },
        returnHeaders: true,
      })

      const verify = auth.api.verifyTOTP({
        body: { code: "000000" },
        headers: toRequestCookieHeaders(signIn.headers),
      })

      await expect(verify).rejects.toMatchObject({ status: UNAUTHORIZED })
    })

    it("password 自体が誤りの場合は TOTP 検証段階に進まずエラーになる", async () => {
      const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD)
      await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)
      const auth = await createTestAuth()

      const signIn = auth.api.signInEmail({
        body: { email: testUser.email, password: "wrong-password" },
      })

      await expect(signIn).rejects.toMatchObject({ status: UNAUTHORIZED })
    })
  })
})
