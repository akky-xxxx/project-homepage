"use client"

import { TwoFactorVerifyView } from "@delmaredigital/payload-better-auth/components"

import { ErrorBanner } from "@/components/ErrorBanner"
import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

import type { JSX } from "react"

const AFTER_LOGIN_PATH = "/"

type SecondFactorStepProps = {
  error: string | null
  isPasskeyLoading: boolean
  onPasskeySignIn: () => void
}

/**
 * password 認証後の第2要素入力ステップ。TOTP/backup code の入力は
 * `TwoFactorVerifyView`(vendor 提供の完成済みコンポーネント)をそのまま使い、
 * passkey を第2要素として使うためのボタンだけを自前で追加する。
 * @param props 操作ハンドラ
 * @param props.error passkey 認証の失敗メッセージ。TOTP/backup code 側のエラーは
 *   `TwoFactorVerifyView` が自前で表示するため、ここでは passkey 由来のものだけを扱う
 * @param props.isPasskeyLoading passkey 認証を実行中かどうか
 * @param props.onPasskeySignIn passkey で第2要素を完了するハンドラ
 * @returns 第2要素の入力画面
 */
export const SecondFactorStep = ({
  error,
  isPasskeyLoading,
  onPasskeySignIn,
}: SecondFactorStepProps): JSX.Element => (
  <div>
    <TwoFactorVerifyView afterVerifyPath={AFTER_LOGIN_PATH} />
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: "calc(var(--base) * -1)",
        padding: "var(--base)",
      }}
    >
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <ErrorBanner message={error} />
      </div>
      <button
        disabled={isPasskeyLoading}
        style={{ ...LOGIN_VIEW_STYLES.secondaryButton, maxWidth: "400px" }}
        type="button"
        onClick={onPasskeySignIn}
      >
        {isPasskeyLoading ? "Verifying..." : "Sign in with passkey instead"}
      </button>
    </div>
  </div>
)
