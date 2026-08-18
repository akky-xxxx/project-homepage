import { afterEach, describe, expect, it } from "vitest"

import { cleanupTestUser } from "../helpers/cleanupTestUser"
import { createTestAuth } from "../helpers/createTestAuth"
import { seedPasswordTestUser } from "../helpers/seedPasswordTestUser"
import { testUser } from "../helpers/testUser"

const CURRENT_PASSWORD = "bootstrap-password-1234"
const NEW_PASSWORD = "changed-password-5678"
// 最小文字数(MINIMUM_PASSWORD_LENGTH = 12)未満
const TOO_SHORT_PASSWORD = "short-pw"
const BAD_REQUEST = "BAD_REQUEST"
const UNAUTHORIZED = "UNAUTHORIZED"

describe("changePassword", () => {
  afterEach(async () => {
    await cleanupTestUser()
  })

  it("正しい currentPassword なら成功し、以後は新パスワードでのみサインインできる", async () => {
    const { id: userId } = await seedPasswordTestUser(CURRENT_PASSWORD)
    const auth = await createTestAuth()
    const context = await auth.$context
    const headers = await context.test.getAuthHeaders({ userId })

    await auth.api.changePassword({
      body: { currentPassword: CURRENT_PASSWORD, newPassword: NEW_PASSWORD },
      headers,
    })

    const signInWithNewPassword = await auth.api.signInEmail({
      body: { email: testUser.email, password: NEW_PASSWORD },
    })
    expect(signInWithNewPassword.user.email).toBe(testUser.email)

    const signInWithOldPassword = auth.api.signInEmail({
      body: { email: testUser.email, password: CURRENT_PASSWORD },
    })
    await expect(signInWithOldPassword).rejects.toMatchObject({ status: UNAUTHORIZED })
  })

  it("currentPassword が誤りの場合は拒否され、パスワードは変更されない", async () => {
    const { id: userId } = await seedPasswordTestUser(CURRENT_PASSWORD)
    const auth = await createTestAuth()
    const context = await auth.$context
    const headers = await context.test.getAuthHeaders({ userId })

    const changePassword = auth.api.changePassword({
      body: { currentPassword: "wrong-current-password", newPassword: NEW_PASSWORD },
      headers,
    })
    await expect(changePassword).rejects.toMatchObject({ status: BAD_REQUEST })

    const signInWithOriginalPassword = await auth.api.signInEmail({
      body: { email: testUser.email, password: CURRENT_PASSWORD },
    })
    expect(signInWithOriginalPassword.user.email).toBe(testUser.email)
  })

  it("未認証(セッション無し)状態で呼ぶと UNAUTHORIZED になる", async () => {
    await seedPasswordTestUser(CURRENT_PASSWORD)
    const auth = await createTestAuth()

    const changePassword = auth.api.changePassword({
      body: { currentPassword: CURRENT_PASSWORD, newPassword: NEW_PASSWORD },
    })

    await expect(changePassword).rejects.toMatchObject({ status: UNAUTHORIZED })
  })

  it("最小文字数未満の newPassword はバリデーションエラーで変更されない", async () => {
    const { id: userId } = await seedPasswordTestUser(CURRENT_PASSWORD)
    const auth = await createTestAuth()
    const context = await auth.$context
    const headers = await context.test.getAuthHeaders({ userId })

    const changePassword = auth.api.changePassword({
      body: { currentPassword: CURRENT_PASSWORD, newPassword: TOO_SHORT_PASSWORD },
      headers,
    })
    await expect(changePassword).rejects.toMatchObject({ status: BAD_REQUEST })

    const signInWithOriginalPassword = await auth.api.signInEmail({
      body: { email: testUser.email, password: CURRENT_PASSWORD },
    })
    expect(signInWithOriginalPassword.user.email).toBe(testUser.email)
  })
})
