import type { LoginOutcome } from "@/types/LoginOutcome"
import type { LoginViewAuthClient } from "@/types/LoginViewAuthClient"

/**
 * 第2要素として passkey でサインインする。
 * @param client `createLoginViewAuthClient` で生成したクライアント
 * @returns サインインの結果
 */
export const signInWithPasskey = async (client: LoginViewAuthClient): Promise<LoginOutcome> => {
  try {
    const result = await client.signIn.passkey()
    if (result.error !== null) {
      return { message: result.error.message ?? "Passkey authentication failed", type: "error" }
    }

    return { type: "success" }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Passkey authentication failed",
      type: "error",
    }
  }
}
