type SignUpClient = {
  signUp: {
    email: (input: { email: string; password: string; name: string }) => Promise<{
      error: { message?: string } | null
    }>
  }
}

const DEFAULT_ERROR_MESSAGE = "Sign up failed. Please try again."

/**
 * email/password でアカウントを作成する。サーバー側の `assertSignUpAllowed` が
 * 許可アドレス・最初の 1 人であることを検証するため、ここでは結果を素通しするだけ。
 * @param client `signUp.email` を持つ Better Auth クライアント(fake client での DI を可能にするため最小構造型)
 * @param input サインアップに使う email / password / name
 * @param input.email メールアドレス
 * @param input.password パスワード
 * @param input.name 表示名
 * @returns サインアップ結果
 */
export const signUpWithCredentials = async (
  client: SignUpClient,
  input: { email: string; password: string; name: string },
): Promise<{ ok: false; message: string } | { ok: true }> => {
  const { error } = await client.signUp.email(input)

  if (error != null) {
    return { message: error.message ?? DEFAULT_ERROR_MESSAGE, ok: false }
  }

  return { ok: true }
}
