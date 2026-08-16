import { applyLoginOutcome } from "@/shared/utilities/applyLoginOutcome"

import type { LoginOutcome } from "@/types/LoginOutcome"
import type { useRouter } from "next/navigation"
import type { Dispatch, SetStateAction } from "react"

const AFTER_LOGIN_PATH = "/"

/**
 * ログイン/サインアップ/passkey 認証の結果を画面状態へ反映するハンドラを作る。
 * @param router `useRouter()` の戻り値
 * @param setError エラーメッセージの setState
 * @param setSecondFactorRequired 第2要素待ちに切り替える setState
 * @returns `LoginOutcome` を受け取るハンドラ
 */
export const createLoginOutcomeHandler = (
  router: ReturnType<typeof useRouter>,
  setError: Dispatch<SetStateAction<string | null>>,
  setSecondFactorRequired: () => void,
) => {
  const onOutcome = (outcome: LoginOutcome): void => {
    applyLoginOutcome(outcome, {
      onError: setError,
      onSecondFactorRequired: setSecondFactorRequired,
      onSuccess: () => {
        router.push(AFTER_LOGIN_PATH)
        router.refresh()
      },
    })
  }

  return onOutcome
}
