import { expect } from "@playwright/test"

import type { LoginOptions } from "./types/LoginOptions"

/**
 * 管理画面ログインページから passkey でログインする。
 * 事前に virtual authenticator へ passkey が登録されている必要がある
 * (registerTestPasskey 参照)。
 * @param options 対象ページと管理画面の URL
 */
export const login = async (options: LoginOptions): Promise<void> => {
  const { page, serverURL = "http://localhost:3000" } = options
  await page.goto(`${serverURL}/login`)

  await page.getByRole("button", { name: "Sign in with Passkey" }).click()

  await page.waitForURL(`${serverURL}/`)

  const dashboardArtifact = page.locator('span[title="Dashboard"]')
  await expect(dashboardArtifact).toBeVisible()
}
