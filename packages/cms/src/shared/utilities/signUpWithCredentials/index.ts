import { validateSignUpPassword } from "@/shared/utilities/validateSignUpPassword"

import type { LoginFormFields } from "@/types/LoginFormFields"
import type { LoginOutcome } from "@/types/LoginOutcome"
import type { LoginViewAuthClient } from "@/types/LoginViewAuthClient"

/**
 * name + email + password でサインアップする(初回セットアップ用)。
 * @param client `createLoginViewAuthClient` で生成したクライアント
 * @param fields `email`/`name`/`password`/`confirmPassword` を含むフォーム入力値
 * @returns サインアップの結果
 */
export const signUpWithCredentials = async (
  client: LoginViewAuthClient,
  fields: LoginFormFields,
): Promise<LoginOutcome> => {
  const { confirmPassword, email, name, password } = fields

  const validationError = validateSignUpPassword(password, confirmPassword)
  if (validationError !== null) return { message: validationError, type: "error" }

  const result = await client.signUp.email({ email, name, password })
  if (result.error !== null) {
    return { message: result.error.message ?? "Registration failed", type: "error" }
  }

  return { type: "success" }
}
