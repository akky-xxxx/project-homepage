import { AuthBanner } from "@/components/LoginView/components/AuthBanner"

import { ChangePasswordInputs } from "./components/ChangePasswordInputs"

type ChangePasswordFieldsProps = {
  confirmNewPassword: string
  currentPassword: string
  errorMessage: string | null
  newPassword: string
  successMessage: string | null
  onConfirmNewPasswordChange: (value: string) => void
  onCurrentPasswordChange: (value: string) => void
  onNewPasswordChange: (value: string) => void
  onSubmit: () => void
}

/**
 * 見出し・エラー/成功バナー・入力欄一式・送信ボタンをまとめる、パスワード変更フィールドの見た目部分。
 * @param props 表示に必要な値とコールバック一式
 * @returns パスワード変更フォーム
 */
export const ChangePasswordFields = (props: ChangePasswordFieldsProps) => {
  const {
    confirmNewPassword,
    currentPassword,
    errorMessage,
    newPassword,
    successMessage,
    onConfirmNewPasswordChange,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onSubmit,
  } = props

  return (
    <div className="field-type">
      <h3>Password</h3>

      {errorMessage != null && <AuthBanner kind="error" message={errorMessage} />}
      {successMessage != null && <AuthBanner kind="success" message={successMessage} />}

      <ChangePasswordInputs
        confirmNewPassword={confirmNewPassword}
        currentPassword={currentPassword}
        newPassword={newPassword}
        onConfirmNewPasswordChange={onConfirmNewPasswordChange}
        onCurrentPasswordChange={onCurrentPasswordChange}
        onNewPasswordChange={onNewPasswordChange}
        onSubmit={onSubmit}
      />

      <button type="button" onClick={onSubmit}>
        Change password
      </button>
    </div>
  )
}
