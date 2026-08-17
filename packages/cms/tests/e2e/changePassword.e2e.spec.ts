import { test, expect } from "@playwright/test"

import { deleteUserByEmail } from "../helpers/deleteUserByEmail"
import { generateTestTOTPCode } from "../helpers/generateTestTOTPCode"
import { loginWithPasswordAndTotp } from "../helpers/loginWithPasswordAndTotp"
import { promoteTestUserToAdmin } from "../helpers/promoteTestUserToAdmin"
import { seedPasswordTestUser } from "../helpers/seedPasswordTestUser"
import { seedTestTOTPSecret } from "../helpers/seedTestTOTPSecret"

import type { Page } from "@playwright/test"

// admin.e2e.spec.ts / login.e2e.spec.ts と別ファイルなので、playwright のファイル間並列実行での
// DB 上のユーザー衝突を避けるため別のメールアドレスを使う
const CHANGE_PASSWORD_TEST_EMAIL = "change-password-e2e-test@example.com"
const CURRENT_PASSWORD = "change-password-e2e-test-1234"
const NEW_PASSWORD = "change-password-e2e-test-5678"
const TOO_SHORT_PASSWORD = "short-pw"
const TEST_TOTP_SECRET = "change-password-e2e-test-totp-secret-1234567890"

/**
 * パスワード変更対象のテストユーザーを準備し、password + TOTP でログインして
 * 自分自身の詳細画面へ遷移するところまでを行う。
 * @param page 対象ページ
 * @returns 作成したユーザーの ID
 */
const setUpAndSignIn = async (page: Page) => {
  const { id: userId } = await seedPasswordTestUser(CURRENT_PASSWORD, CHANGE_PASSWORD_TEST_EMAIL)
  await seedTestTOTPSecret(userId, TEST_TOTP_SECRET)
  await promoteTestUserToAdmin(userId)

  await loginWithPasswordAndTotp({
    email: CHANGE_PASSWORD_TEST_EMAIL,
    page,
    password: CURRENT_PASSWORD,
    totpCode: generateTestTOTPCode(TEST_TOTP_SECRET),
  })

  // ログイン成功後の "/" へのリダイレクト(セッション確立)を待ってから遷移する。
  // 直後に goto すると verifyTOTP のレスポンス待ちの途中でナビゲーションが割り込み、
  // セッションクッキーが未確立のまま /login へ弾き返されることがある
  await expect(page).toHaveURL("http://localhost:3000/")

  await page.goto(`http://localhost:3000/collections/users/${userId}`)

  // Payload の Form は初期化を終えると data-form-ready="true" を立てる(ライブラリ側が e2e の
  // ちらつき対策として用意している属性)。hydration 前に fill すると DOM だけ値が入って
  // フォーム state には反映されず、送信時に必須エラーになるため、ここで待ってから操作する。
  // ドキュメント編集フォーム(form 要素)にも同じ属性が付くので、el="div" で描画している
  // パスワード変更フォーム側だけを指す
  await expect(
    page
      .locator('div.form[data-form-ready="true"]')
      .filter({ has: page.getByRole("button", { name: "Change password" }) }),
  ).toBeVisible()

  // 画面表示後も get-session / list-user-passkeys が飛んでおり、その解決に伴う再描画が
  // 入力中のフォーカスやキーイベントと競合する。落ち着くまで待ってから操作する
  await page.waitForLoadState("networkidle")

  return userId
}

test.describe("パスワード変更", () => {
  test.afterEach(async () => {
    await deleteUserByEmail(CHANGE_PASSWORD_TEST_EMAIL)
  })

  test("自分自身の詳細画面にパスワード変更フォームが表示される", async ({ page }) => {
    await setUpAndSignIn(page)

    await expect(page.getByLabel("Current password", { exact: true })).toBeVisible()
    await expect(page.getByLabel("New password", { exact: true })).toBeVisible()
    await expect(page.getByLabel("Confirm Password", { exact: true })).toBeVisible()
  })

  test("正しい現パスワードで新パスワードに変更でき、ログアウト後は新パスワードでのみログインできる", async ({
    page,
  }) => {
    await setUpAndSignIn(page)

    await page.getByLabel("Current password", { exact: true }).fill(CURRENT_PASSWORD)
    await page.getByLabel("New password", { exact: true }).fill(NEW_PASSWORD)
    await page.getByLabel("Confirm Password", { exact: true }).fill(NEW_PASSWORD)
    await page.getByRole("button", { name: "Change password" }).click()

    await expect(page.getByText("Password changed.")).toBeVisible()

    await page.getByRole("button", { name: "Log out" }).dispatchEvent("click")
    await page.waitForURL("http://localhost:3000/login")

    await loginWithPasswordAndTotp({
      email: CHANGE_PASSWORD_TEST_EMAIL,
      page,
      password: NEW_PASSWORD,
      totpCode: generateTestTOTPCode(TEST_TOTP_SECRET),
    })

    await expect(page).toHaveURL("http://localhost:3000/")
  })

  test("誤った現パスワードでは失敗表示になり、変更されない", async ({ page }) => {
    await setUpAndSignIn(page)

    await page.getByLabel("Current password", { exact: true }).fill("wrong-current-password")
    await page.getByLabel("New password", { exact: true }).fill(NEW_PASSWORD)
    await page.getByLabel("Confirm Password", { exact: true }).fill(NEW_PASSWORD)
    await page.getByRole("button", { name: "Change password" }).click()

    await expect(page.getByRole("alert")).toBeVisible()
  })

  test("新パスワードが最小文字数未満だと送信できない", async ({ page }) => {
    await setUpAndSignIn(page)

    await page.getByLabel("Current password", { exact: true }).fill(CURRENT_PASSWORD)
    await page.getByLabel("New password", { exact: true }).fill(TOO_SHORT_PASSWORD)
    await page.getByLabel("Confirm Password", { exact: true }).fill(TOO_SHORT_PASSWORD)
    await page.getByRole("button", { name: "Change password" }).click()

    await expect(page.getByText("Password must be at least 12 characters long.")).toBeVisible()
  })

  test("入力欄で Enter を押してもユーザードキュメントは保存されない", async ({ page }) => {
    const userId = await setUpAndSignIn(page)

    // このフォームは Payload のドキュメント編集フォームの内側にあり、Form を el="div" で
    // 描画している。Enter の既定動作を止めないと暗黙の送信が外側のフォームへ向かい、
    // パスワード変更ではなくドキュメント保存が走ってしまう
    const documentSaveRequests: string[] = []
    page.on("request", (request) => {
      const isDocumentSave =
        request.method() === "PATCH" && request.url().includes(`/api/users/${userId}`)
      if (isDocumentSave) documentSaveRequests.push(request.url())
    })

    await page.getByLabel("Current password", { exact: true }).fill(CURRENT_PASSWORD)
    await page.getByLabel("New password", { exact: true }).fill(NEW_PASSWORD)
    await page.getByLabel("Confirm Password", { exact: true }).fill(NEW_PASSWORD)
    await page.getByLabel("Confirm Password", { exact: true }).press("Enter")

    // Enter はパスワード変更として処理される
    await expect(page.getByText("Password changed.")).toBeVisible()
    expect(documentSaveRequests).toHaveLength(0)
  })

  test("送信中に連打してもパスワード変更 API は 1 回しか呼ばれない", async ({ page }) => {
    await setUpAndSignIn(page)

    const changePasswordRequests: string[] = []
    page.on("request", (request) => {
      if (request.url().includes("/api/auth/change-password")) {
        changePasswordRequests.push(request.url())
      }
    })

    await page.getByLabel("Current password", { exact: true }).fill(CURRENT_PASSWORD)
    await page.getByLabel("New password", { exact: true }).fill(NEW_PASSWORD)
    await page.getByLabel("Confirm Password", { exact: true }).fill(NEW_PASSWORD)
    await page.getByRole("button", { name: "Change password" }).dblclick()

    await expect(page.getByText("Password changed.")).toBeVisible()
    expect(changePasswordRequests).toHaveLength(1)
  })
})
