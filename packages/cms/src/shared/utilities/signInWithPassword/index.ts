type PasswordSignInClient = {
  signIn: {
    email: (input: { email: string; password: string }) => Promise<{
      data: { twoFactorRedirect?: boolean } | null
      error: { message?: string } | null
    }>
  }
}

type SignInWithPasswordResult =
  { status: "error"; message: string } | { status: "signedIn" } | { status: "twoFactorRequired" }

const DEFAULT_ERROR_MESSAGE = "Sign in failed. Please try again."

/**
 * password + email でサインインする。TOTP が有効なアカウントは Better Auth 側で
 * フルセッションの発行が保留され、`twoFactorRedirect: true` が返る。
 * @param client `signIn.email` を持つ Better Auth クライアント(fake client での DI を可能にするため最小構造型)
 * @param input サインインに使う email / password
 * @param input.email メールアドレス
 * @param input.password パスワード
 * @returns サインイン結果(成功 / 2FA 要求 / エラー)
 */
const signInWithPassword = async (
  client: PasswordSignInClient,
  input: { email: string; password: string },
): Promise<SignInWithPasswordResult> => {
  const { data, error } = await client.signIn.email(input)

  if (error != null) {
    return { message: error.message ?? DEFAULT_ERROR_MESSAGE, status: "error" }
  }

  if (data?.twoFactorRedirect ?? false) {
    return { status: "twoFactorRequired" }
  }

  return { status: "signedIn" }
}

export { signInWithPassword, type SignInWithPasswordResult }
