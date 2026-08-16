import { AuthBanner } from "@/components/LoginView/components/AuthBanner"
import { LabeledInput } from "@/components/LoginView/components/LabeledInput"
import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

import { NewPasswordFields } from "./components/NewPasswordFields"

import type { SyntheticEvent } from "react"

const EMAIL_ID = "login-register-email"
const NAME_ID = "login-register-name"

type RegisterFieldsProps = {
  confirmNewPassword: string
  email: string
  errorMessage: string | null
  name: string
  newPassword: string
  onConfirmNewPasswordChange: (value: string) => void
  onEmailChange: (value: string) => void
  onNameChange: (value: string) => void
  onNewPasswordChange: (value: string) => void
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void
}

/**
 * email/name/password/confirm の入力欄そのもの(見た目のみ、状態は持たない)。
 * @param props 表示に必要な値とコールバック一式
 * @returns サインアップフォーム
 */
export const RegisterFields = (props: RegisterFieldsProps) => {
  const {
    confirmNewPassword,
    email,
    errorMessage,
    name,
    newPassword,
    onConfirmNewPasswordChange,
    onEmailChange,
    onNameChange,
    onNewPasswordChange,
    onSubmit,
  } = props

  return (
    <form onSubmit={onSubmit}>
      {errorMessage != null && <AuthBanner kind="error" message={errorMessage} />}

      <LabeledInput
        autoComplete="email"
        id={EMAIL_ID}
        label="Email"
        type="email"
        value={email}
        onChange={onEmailChange}
      />
      <LabeledInput
        autoComplete="name"
        id={NAME_ID}
        label="Name"
        type="text"
        value={name}
        onChange={onNameChange}
      />
      <NewPasswordFields
        confirmNewPassword={confirmNewPassword}
        newPassword={newPassword}
        onConfirmNewPasswordChange={onConfirmNewPasswordChange}
        onNewPasswordChange={onNewPasswordChange}
      />

      <button style={LOGIN_VIEW_STYLES.submitButton} type="submit">
        Create account
      </button>
    </form>
  )
}
