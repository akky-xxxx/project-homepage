import { expect } from "@playwright/test"

import { generateTestTOTPCode } from "../generateTestTOTPCode"

import type { LoginOptions } from "./types/LoginOptions"

/**
 * 管理画面ログインページから password + TOTP でログインする。
 * 事前に `seedTestTOTPSecret` で対象ユーザーの TOTP を有効化しておく必要がある。
 * @param options 対象ページ・認証情報・管理画面の URL
 */
export const login = async (options: LoginOptions): Promise<void> => {
  const { page, email, password, totpSecret, serverURL = "http://localhost:3000" } = options
  await page.goto(`${serverURL}/login`)

  await page.getByLabel("Email").fill(email)
  await page.getByLabel("Password", { exact: true }).fill(password)
  await page.getByRole("button", { name: "Sign in" }).click()

  await page.getByLabel("Verification Code").fill(generateTestTOTPCode(totpSecret))
  await page.getByRole("button", { name: "Verify" }).click()

  await page.waitForURL(`${serverURL}/`)

  const dashboardArtifact = page.locator('span[title="Dashboard"]')
  await expect(dashboardArtifact).toBeVisible()
}
