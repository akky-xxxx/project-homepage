import { MINIMUM_PASSWORD_LENGTH } from "@/shared/const/MINIMUM_PASSWORD_LENGTH"

/**
 * 新規パスワード(サインアップ時の password/confirm)の入力値をクライアント側で検証する。
 * サーバー側の最小長検証(`betterAuthOptions.emailAndPassword.minPasswordLength`)を
 * 先回りしてユーザーへフィードバックするためのものであり、サーバー側検証の代替ではない。
 * @param input 新しいパスワードと確認用の入力値
 * @param input.newPassword 新しいパスワード
 * @param input.confirmNewPassword 確認用の入力値
 * @returns 検証結果(不合格の場合は理由メッセージを含む)
 */
export const validateNewPassword = (input: {
  newPassword: string
  confirmNewPassword: string
}): { ok: false; message: string } | { ok: true } => {
  const { newPassword, confirmNewPassword } = input

  if (newPassword.length < MINIMUM_PASSWORD_LENGTH) {
    return {
      message: `Password must be at least ${String(MINIMUM_PASSWORD_LENGTH)} characters long.`,
      ok: false,
    }
  }

  if (newPassword !== confirmNewPassword) {
    return { message: "Passwords do not match.", ok: false }
  }

  return { ok: true }
}
