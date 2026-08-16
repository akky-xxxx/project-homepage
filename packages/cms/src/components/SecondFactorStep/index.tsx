"use client"

import { TwoFactorVerifyView } from "@delmaredigital/payload-better-auth/components"

import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

import type { JSX } from "react"

const AFTER_LOGIN_PATH = "/"

type SecondFactorStepProps = {
  isPasskeyLoading: boolean
  onPasskeySignIn: () => void
}

/**
 * password 認証後の第2要素入力ステップ。TOTP/backup code の入力は
 * `TwoFactorVerifyView`(vendor 提供の完成済みコンポーネント)をそのまま使い、
 * passkey を第2要素として使うためのボタンだけを自前で追加する。
 * @param props 操作ハンドラ
 * @param props.isPasskeyLoading passkey 認証を実行中かどうか
 * @param props.onPasskeySignIn passkey で第2要素を完了するハンドラ
 * @returns 第2要素の入力画面
 */
export const SecondFactorStep = ({
  isPasskeyLoading,
  onPasskeySignIn,
}: SecondFactorStepProps): JSX.Element => (
  <div>
    <TwoFactorVerifyView afterVerifyPath={AFTER_LOGIN_PATH} />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "calc(var(--base) * -1)",
        padding: "var(--base)",
      }}
    >
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
