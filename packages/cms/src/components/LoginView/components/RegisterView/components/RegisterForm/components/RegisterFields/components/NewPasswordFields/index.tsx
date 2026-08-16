import { LabeledInput } from "@/components/LoginView/components/LabeledInput"

// eslint-disable-next-line sonarjs/no-hardcoded-passwords -- HTML の id 文字列であり実際の秘密情報ではない
const NEW_PASSWORD_ID = "login-register-new-password"
// eslint-disable-next-line sonarjs/no-hardcoded-passwords -- HTML の id 文字列であり実際の秘密情報ではない
const CONFIRM_NEW_PASSWORD_ID = "login-register-confirm-new-password"

type NewPasswordFieldsProps = {
  confirmNewPassword: string
  newPassword: string
  onConfirmNewPasswordChange: (value: string) => void
  onNewPasswordChange: (value: string) => void
}

/**
 * サインアップフォームの新パスワード・確認用パスワードの入力欄一式。
 * @param props 表示に必要な値とコールバック
 * @returns 新パスワード・確認用パスワードの入力欄
 */
export const NewPasswordFields = (props: NewPasswordFieldsProps) => {
  const { confirmNewPassword, newPassword, onConfirmNewPasswordChange, onNewPasswordChange } = props

  return (
    <div>
      <LabeledInput
        autoComplete="new-password"
        id={NEW_PASSWORD_ID}
        label="Password"
        type="password"
        value={newPassword}
        onChange={onNewPasswordChange}
      />
      <LabeledInput
        autoComplete="new-password"
        id={CONFIRM_NEW_PASSWORD_ID}
        label="Confirm password"
        type="password"
        value={confirmNewPassword}
        onChange={onConfirmNewPasswordChange}
      />
    </div>
  )
}
