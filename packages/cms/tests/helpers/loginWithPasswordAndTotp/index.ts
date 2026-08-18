import type { LoginWithPasswordAndTotpOptions } from "./types/LoginWithPasswordAndTotpOptions"

/**
 * 管理画面ログインページから password + TOTP でログインする一連の UI 操作をまとめる。
 * 「パスワードでサインイン」トグルを開く → email/password 入力 → 送信 →
 * TOTP コード入力 → 送信、まで行い、結果の検証(成功/失敗)は呼び出し側に委ねる。
 * @param options 対象ページ・email・password・TOTP コード・管理画面の URL
 */
export const loginWithPasswordAndTotp = async (
  options: LoginWithPasswordAndTotpOptions,
): Promise<void> => {
  const { page, email, password, totpCode, serverURL = "http://localhost:3000" } = options

  await page.goto(`${serverURL}/login`)
  await page.getByRole("button", { name: "Use a password instead" }).click()
  await page.getByLabel("Email").fill(email)
  await page.getByLabel("Password").fill(password)
  await page.getByRole("button", { exact: true, name: "Sign in" }).click()

  await page.getByLabel("Verification Code").fill(totpCode)
  await page.getByRole("button", { name: "Verify" }).click()
}
