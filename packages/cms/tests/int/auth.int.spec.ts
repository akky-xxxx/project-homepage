import { afterEach, describe, expect, it } from "vitest"

import { cleanupTestUser } from "../helpers/cleanupTestUser"
import { createTestAuth } from "../helpers/createTestAuth"
import { deleteUserByEmail } from "../helpers/deleteUserByEmail"
import { seedPasswordTestUser } from "../helpers/seedPasswordTestUser"
import { seedTestPasskey } from "../helpers/seedTestPasskey"
import { testUser } from "../helpers/testUser"

const TEST_PASSWORD = "bootstrap-password-1234"
const SECOND_USER_EMAIL = "second-user@example.com"
const UNKNOWN_USER_EMAIL = "unknown-user@example.com"

const FORBIDDEN = "FORBIDDEN"
const UNAUTHORIZED = "UNAUTHORIZED"

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

    it("存在しないメールアドレスは passkey 判定を素通しして認証エラーになる", async () => {
      const auth = await createTestAuth()

      const signIn = auth.api.signInEmail({
        body: { email: UNKNOWN_USER_EMAIL, password: TEST_PASSWORD },
      })

      await expect(signIn).rejects.toMatchObject({ status: UNAUTHORIZED })
    })
  })
})
