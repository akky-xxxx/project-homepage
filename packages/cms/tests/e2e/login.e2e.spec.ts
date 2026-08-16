import { test, expect } from "@playwright/test"

import { addVirtualAuthenticator } from "../helpers/addVirtualAuthenticator"
import { deleteUserByEmail } from "../helpers/deleteUserByEmail"
import { generateTestTOTPCode } from "../helpers/generateTestTOTPCode"
import { registerTestPasskey } from "../helpers/registerTestPasskey"
import { removeVirtualAuthenticator } from "../helpers/removeVirtualAuthenticator"
import { seedTestTOTPSecret } from "../helpers/seedTestTOTPSecret"
import { seedTestUser } from "../helpers/seedTestUser"
import { testUser } from "../helpers/testUser"

const SERVER_URL = "http://localhost:3000"
const TEST_TOTP_SECRET = "login-e2e-totp-secret"

// admin.e2e.spec.ts と並列実行されても衝突しないよう、testUser.email とは別の
// email を使う(seedTestUser/deleteUserByEmail はどちらも email を引数に取れる)
const LOGIN_TEST_EMAIL = "login-e2e@example.com"

test.describe("ログイン", () => {
  test.afterEach(async () => {
    await deleteUserByEmail(LOGIN_TEST_EMAIL)
  })

  test("password だけでは完結せず、TOTP コードの入力を要求される", async ({ page }) => {
    const { id: userId } = await seedTestUser(LOGIN_TEST_EMAIL)
    await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)

    await page.goto(`${SERVER_URL}/login`)
    await page.getByLabel("Email").fill(LOGIN_TEST_EMAIL)
    await page.getByLabel("Password", { exact: true }).fill(testUser.password)
    await page.getByRole("button", { name: "Sign in" }).click()

    await expect(page.getByLabel("Verification Code")).toBeVisible()
  })

  test("誤った password はエラー表示になり、第2要素の画面には進まない", async ({ page }) => {
    const { id: userId } = await seedTestUser(LOGIN_TEST_EMAIL)
    await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)

    await page.goto(`${SERVER_URL}/login`)
    await page.getByLabel("Email").fill(LOGIN_TEST_EMAIL)
    await page.getByLabel("Password", { exact: true }).fill("wrong-password")
    await page.getByRole("button", { name: "Sign in" }).click()

    await expect(page.getByRole("alert")).toBeVisible()
    await expect(page.getByLabel("Verification Code")).not.toBeVisible()
  })

  test("正しい TOTP コードでログインできる", async ({ page }) => {
    const { id: userId } = await seedTestUser(LOGIN_TEST_EMAIL)
    await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)

    await page.goto(`${SERVER_URL}/login`)
    await page.getByLabel("Email").fill(LOGIN_TEST_EMAIL)
    await page.getByLabel("Password", { exact: true }).fill(testUser.password)
    await page.getByRole("button", { name: "Sign in" }).click()

    await page.getByLabel("Verification Code").fill(generateTestTOTPCode(TEST_TOTP_SECRET))
    await page.getByRole("button", { name: "Verify" }).click()

    await page.waitForURL(`${SERVER_URL}/`)
    await expect(page.locator('span[title="Dashboard"]')).toBeVisible()
  })

  test("誤った TOTP コードはエラー表示になる", async ({ page }) => {
    const { id: userId } = await seedTestUser(LOGIN_TEST_EMAIL)
    await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)

    await page.goto(`${SERVER_URL}/login`)
    await page.getByLabel("Email").fill(LOGIN_TEST_EMAIL)
    await page.getByLabel("Password", { exact: true }).fill(testUser.password)
    await page.getByRole("button", { name: "Sign in" }).click()

    await page.getByLabel("Verification Code").fill("000000")
    await page.getByRole("button", { name: "Verify" }).click()

    await expect(page.getByText(/invalid/i)).toBeVisible()
  })

  test("passkey を第2要素として使ってログインできる", async ({ page }) => {
    const { id: userId } = await seedTestUser(LOGIN_TEST_EMAIL)
    await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)

    const authenticator = await addVirtualAuthenticator(page)
    await registerTestPasskey({ context: page.context(), page, userId })

    try {
      await page.goto(`${SERVER_URL}/login`)
      await page.getByLabel("Email").fill(LOGIN_TEST_EMAIL)
      await page.getByLabel("Password", { exact: true }).fill(testUser.password)
      await page.getByRole("button", { name: "Sign in" }).click()

      await page.getByRole("button", { name: "Sign in with passkey instead" }).click()

      await page.waitForURL(`${SERVER_URL}/`)
      await expect(page.locator('span[title="Dashboard"]')).toBeVisible()
    } finally {
      await removeVirtualAuthenticator(authenticator)
    }
  })
})
