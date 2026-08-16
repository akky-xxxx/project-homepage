const MINIMUM_PASSWORD_LENGTH = 12

/**
 * サインアップ時の password 入力を検証する。
 * @param password 入力された password
 * @param confirmPassword 確認用に入力された password
 * @returns 検証エラーメッセージ。問題なければ null
 */
export const validateSignUpPassword = (
  password: string,
  confirmPassword: string,
): string | null => {
  if (password !== confirmPassword) return "Passwords do not match"
  if (password.length < MINIMUM_PASSWORD_LENGTH) {
    return `Password must be at least ${MINIMUM_PASSWORD_LENGTH.toString()} characters`
  }

  return null
}
