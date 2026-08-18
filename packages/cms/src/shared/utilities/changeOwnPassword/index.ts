type ChangePasswordClient = {
  changePassword: (input: {
    currentPassword: string
    newPassword: string
    revokeOtherSessions?: boolean
  }) => Promise<{ data: unknown; error: { message?: string } | null }>
}

const DEFAULT_ERROR_MESSAGE = "Failed to change password. Please try again."

/**
 * 現在ログイン中のユーザー自身のパスワードを変更する。better-auth コアの
 * `POST /change-password` は「閲覧中のドキュメント」ではなく「現在のセッションユーザー」に
 * 対して作用するため、呼び出し元(`ChangePasswordField`)で対象がセッションユーザー自身であることを
 * 確認してから呼び出すこと。`revokeOtherSessions: true` を常に指定し、他デバイスのセッションを
 * 失効させる(現在のセッションは維持される)。
 * @param client `changePassword` を持つ Better Auth クライアント(fake client での DI を可能にするため最小構造型)
 * @param input パスワード変更に使う現在のパスワード / 新しいパスワード
 * @param input.currentPassword 現在のパスワード
 * @param input.newPassword 新しいパスワード
 * @returns パスワード変更結果
 */
export const changeOwnPassword = async (
  client: ChangePasswordClient,
  input: { currentPassword: string; newPassword: string },
): Promise<{ ok: false; message: string } | { ok: true }> => {
  const { currentPassword, newPassword } = input

  const { error } = await client.changePassword({
    currentPassword,
    newPassword,
    revokeOtherSessions: true,
  })

  if (error != null) {
    return { message: error.message ?? DEFAULT_ERROR_MESSAGE, ok: false }
  }

  return { ok: true }
}
