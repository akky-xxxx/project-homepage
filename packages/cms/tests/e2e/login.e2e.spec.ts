import { test, expect } from "@playwright/test"

import { addVirtualAuthenticator } from "../helpers/addVirtualAuthenticator"
import { deleteUserByEmail } from "../helpers/deleteUserByEmail"
import { generateTestTOTPCode } from "../helpers/generateTestTOTPCode"
import { login } from "../helpers/login"
import { loginWithPasswordAndTotp } from "../helpers/loginWithPasswordAndTotp"
import { promoteTestUserToAdmin } from "../helpers/promoteTestUserToAdmin"
import { registerTestPasskey } from "../helpers/registerTestPasskey"
import { removeVirtualAuthenticator } from "../helpers/removeVirtualAuthenticator"
import { seedPasswordTestUser } from "../helpers/seedPasswordTestUser"
import { seedTestTOTPSecret } from "../helpers/seedTestTOTPSecret"
import { seedTestUser } from "../helpers/seedTestUser"

// admin.e2e.spec.ts と別ファイルなので、playwright のファイル間並列実行での
// DB 上のユーザー衝突を避けるため testUser.email とは別のメールアドレスを使う
const LOGIN_TEST_EMAIL = "login-e2e-test@example.com"
const TEST_PASSWORD = "login-e2e-test-password-1234"
const TEST_TOTP_SECRET = "login-e2e-test-totp-secret-1234567890"
const FORBIDDEN_STATUS = 403
const NOT_RENDERED_COUNT = 0

test.describe("ログイン画面", () => {
  test.afterEach(async () => {
    await deleteUserByEmail(LOGIN_TEST_EMAIL)
  })

  test("passkey でログインできる", async ({ browser }) => {
    const { id: userId } = await seedTestUser(LOGIN_TEST_EMAIL)

    const context = await browser.newContext()
    const page = await context.newPage()
    const authenticator = await addVirtualAuthenticator(page)

    await registerTestPasskey({ context, page, userId })
    await login({ page })

    await removeVirtualAuthenticator(authenticator)
  })

  test("password + 正しい TOTP コードでログインできる", async ({ page }) => {
    const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD, LOGIN_TEST_EMAIL)
    await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)
    await promoteTestUserToAdmin(userId)

    await loginWithPasswordAndTotp({
      email: LOGIN_TEST_EMAIL,
      page,
      password: TEST_PASSWORD,
      totpCode: generateTestTOTPCode(TEST_TOTP_SECRET),
    })

    await expect(page).toHaveURL("http://localhost:3000/")
    const dashboardArtifact = page.locator('span[title="Dashboard"]')
    await expect(dashboardArtifact).toBeVisible()
  })

  test("password が誤りの場合はエラー表示、TOTP 入力画面に進まない", async ({ page }) => {
    await seedPasswordTestUser(TEST_PASSWORD, LOGIN_TEST_EMAIL)

    await page.goto("http://localhost:3000/login")
    await page.getByRole("button", { name: "Use a password instead" }).click()
    await page.getByLabel("Email").fill(LOGIN_TEST_EMAIL)
    await page.getByLabel("Password").fill("wrong-password")
    await page.getByRole("button", { exact: true, name: "Sign in" }).click()

    await expect(page.getByRole("alert")).toBeVisible()
    await expect(page.getByLabel("Verification Code")).toHaveCount(NOT_RENDERED_COUNT)
  })

  test("password は正しいが TOTP コードが誤りの場合はエラー表示、セッションが確立しない", async ({
    page,
  }) => {
    const { id: userId } = await seedPasswordTestUser(TEST_PASSWORD, LOGIN_TEST_EMAIL)
    await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)

    await loginWithPasswordAndTotp({
      email: LOGIN_TEST_EMAIL,
      page,
      password: TEST_PASSWORD,
      totpCode: "000000",
    })

    await expect(page.getByText("Invalid code")).toBeVisible()

    const response = await page.request.get("http://localhost:3000/api/users")
    expect(response.status()).toBe(FORBIDDEN_STATUS)
  })
})
