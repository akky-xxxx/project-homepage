import { test, expect } from "@playwright/test"

import { cleanupTestUser } from "../helpers/cleanupTestUser"
import { login } from "../helpers/login"
import { seedTestTOTPSecret } from "../helpers/seedTestTOTPSecret"
import { seedTestUser } from "../helpers/seedTestUser"
import { testUser } from "../helpers/testUser"

import type { Page } from "@playwright/test"

const FORBIDDEN_STATUS = 403
const TEST_TOTP_SECRET = "admin-e2e-totp-secret"

test.describe("Admin Panel", () => {
  let page: Page

  // Playwright は callback のソースを正規表現で解析し、第一引数の分割代入パターンから
  // 注入する fixture を決めるため、ここは仮引数で分割代入する必要がある
  // (playwright/lib/common/fixtures.js の innerFixtureParameterNames)
  test.beforeAll(async ({ browser }) => {
    const { id: userId } = await seedTestUser()
    await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)

    const context = await browser.newContext()
    page = await context.newPage()

    await login({
      email: testUser.email,
      page,
      password: testUser.password,
      totpSecret: TEST_TOTP_SECRET,
    })
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test("can navigate to dashboard", async () => {
    await page.goto("http://localhost:3000/")
    await expect(page).toHaveURL("http://localhost:3000/")
    const dashboardArtifact = page.locator('span[title="Dashboard"]').first()
    await expect(dashboardArtifact).toBeVisible()
  })

  test("can navigate to list view", async () => {
    await page.goto("http://localhost:3000/collections/users")
    await expect(page).toHaveURL("http://localhost:3000/collections/users")
    const listViewArtifact = page.locator("h1", { hasText: "Users" }).first()
    await expect(listViewArtifact).toBeVisible()
  })

  test("can navigate to edit view", async () => {
    await page.goto("http://localhost:3000/collections/users/create")
    await expect(page).toHaveURL(/\/collections\/users\/[a-zA-Z0-9-_]+/)
    const editViewArtifact = page.locator('input[name="email"]')
    await expect(editViewArtifact).toBeVisible()
  })

  // 以降はセッションを破棄するため、必ず末尾に置く
  // ログアウトボタンは nav の最下部にあり、dev サーバーの <nextjs-portal>(開発用
  // インジケータ)が実際のクリックを奪うため、DOM へ直接 click を dispatch する
  test("ログアウトに失敗した場合はログイン画面へ遷移しない", async () => {
    await page.goto("http://localhost:3000/")
    await page.route("**/api/auth/sign-out", (route) => route.abort())

    await page.getByRole("button", { name: "Log out" }).dispatchEvent("click")

    await expect(page.getByRole("alert")).toBeVisible()
    await expect(page).toHaveURL("http://localhost:3000/")

    await page.unroute("**/api/auth/sign-out")
  })

  test("ログアウト後は認証必須の API が 403 になる", async () => {
    await page.getByRole("button", { name: "Log out" }).dispatchEvent("click")
    await page.waitForURL("http://localhost:3000/login")

    const response = await page.request.get("http://localhost:3000/api/users")

    expect(response.status()).toBe(FORBIDDEN_STATUS)
  })
})
