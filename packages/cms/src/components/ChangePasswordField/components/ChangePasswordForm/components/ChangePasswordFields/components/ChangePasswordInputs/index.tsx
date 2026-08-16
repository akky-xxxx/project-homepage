import { LabeledInput } from "@/components/LoginView/components/LabeledInput"

import type { KeyboardEvent } from "react"

// eslint-disable-next-line sonarjs/no-hardcoded-passwords -- HTML の id 文字列であり実際の秘密情報ではない
const CURRENT_PASSWORD_ID = "change-password-current"
// eslint-disable-next-line sonarjs/no-hardcoded-passwords -- HTML の id 文字列であり実際の秘密情報ではない
const NEW_PASSWORD_ID = "change-password-new"
// eslint-disable-next-line sonarjs/no-hardcoded-passwords -- HTML の id 文字列であり実際の秘密情報ではない
const CONFIRM_NEW_PASSWORD_ID = "change-password-confirm"

type ChangePasswordInputsProps = {
  confirmNewPassword: string
  currentPassword: string
  newPassword: string
  onConfirmNewPasswordChange: (value: string) => void
  onCurrentPasswordChange: (value: string) => void
  onNewPasswordChange: (value: string) => void
  onSubmit: () => void
}

/**
 * 現在のパスワード・新パスワード・確認用パスワードの入力欄そのもの(見た目のみ、状態は持たない)。
 * 親(`ChangePasswordFields`)は Payload のドキュメント編集画面(既に `<form>` でラップされている)に
 * 埋め込まれるため、`<form>` の入れ子(無効な HTML、hydration mismatch の原因になる)を避け、
 * Enter キーは各入力欄の `onKeyDown` で送信する(ライブラリ標準の `TwoFactorManagementClient` と同じ方式)。
 * @param props 表示に必要な値とコールバック一式
 * @returns 現在のパスワード・新パスワード・確認用パスワードの入力欄
 */
export const ChangePasswordInputs = (props: ChangePasswordInputsProps) => {
  const {
    confirmNewPassword,
    currentPassword,
    newPassword,
    onConfirmNewPasswordChange,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onSubmit,
  } = props

  const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return
    event.preventDefault()
    onSubmit()
  }

  return (
    <div>
      <LabeledInput
        autoComplete="current-password"
        id={CURRENT_PASSWORD_ID}
        label="Current password"
        type="password"
        value={currentPassword}
        onChange={onCurrentPasswordChange}
        onKeyDown={handleEnterKeyDown}
      />
      <LabeledInput
        autoComplete="new-password"
        id={NEW_PASSWORD_ID}
        label="New password"
        type="password"
        value={newPassword}
        onChange={onNewPasswordChange}
        onKeyDown={handleEnterKeyDown}
      />
      <LabeledInput
        autoComplete="new-password"
        id={CONFIRM_NEW_PASSWORD_ID}
        label="Confirm new password"
        type="password"
        value={confirmNewPassword}
        onChange={onConfirmNewPasswordChange}
        onKeyDown={handleEnterKeyDown}
      />
    </div>
  )
}
