import type { LoginOutcome } from "@/types/LoginOutcome"

type ApplyLoginOutcomeCallbacks = {
  onError: (message: string) => void
  onSecondFactorRequired: () => void
  onSuccess: () => void
}

/**
 * サインイン/サインアップ/passkey 認証の結果を、対応するコールバックに振り分ける。
 * @param outcome `signInWithCredentials` 等が返した結果
 * @param callbacks 結果ごとのコールバック
 */
export const applyLoginOutcome = (
  outcome: LoginOutcome,
  callbacks: ApplyLoginOutcomeCallbacks,
): void => {
  if (outcome.type === "secondFactor") {
    callbacks.onSecondFactorRequired()
    return
  }
  if (outcome.type === "error") {
    callbacks.onError(outcome.message)
    return
  }

  callbacks.onSuccess()
}
