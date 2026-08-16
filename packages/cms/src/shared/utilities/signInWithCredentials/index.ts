import type { LoginFormFields } from "@/types/LoginFormFields"
import type { LoginOutcome } from "@/types/LoginOutcome"
import type { LoginViewAuthClient } from "@/types/LoginViewAuthClient"

/**
 * email + password でサインインする。第2要素が必要な場合は `secondFactor`、
 * 成功すればセッションが確立された `success` を返す。
 * @param client `createLoginViewAuthClient` で生成したクライアント
 * @param fields `email`/`password` を含むフォーム入力値
 * @returns サインインの結果
 */
export const signInWithCredentials = async (
  client: LoginViewAuthClient,
  fields: Pick<LoginFormFields, "email" | "password">,
): Promise<LoginOutcome> => {
  const result = await client.signIn.email(fields)

  if (result.data && "twoFactorRedirect" in result.data && result.data.twoFactorRedirect === true) {
    return { type: "secondFactor" }
  }
  if (result.error !== null) {
    return { message: result.error.message ?? "Invalid credentials", type: "error" }
  }

  return { type: "success" }
}
