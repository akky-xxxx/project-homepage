import { AuthBanner } from "@/components/LoginView/components/AuthBanner"
import { LabeledInput } from "@/components/LoginView/components/LabeledInput"
import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

import type { Ref, SyntheticEvent } from "react"

const EMAIL_ID = "login-password-sign-in-email"
// eslint-disable-next-line sonarjs/no-hardcoded-passwords -- HTML の id 文字列であり実際の秘密情報ではない
const PASSWORD_ID = "login-password-sign-in-password"

type PasswordCredentialsFieldsProps = {
  email: string
  emailRef: Ref<HTMLInputElement>
  errorMessage: string | null
  formId: string
  isOpen: boolean
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void
}

/**
 * email/password の入力欄そのもの(見た目のみ、状態は持たない)。
 * @param props 表示に必要な値とコールバック一式
 * @returns email/password のサインインフォーム
 */
export const PasswordCredentialsFields = (props: PasswordCredentialsFieldsProps) => {
  const {
    email,
    emailRef,
    errorMessage,
    formId,
    isOpen,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit,
  } = props

  return (
    <form hidden={!isOpen} id={formId} onSubmit={onSubmit}>
      {errorMessage != null && <AuthBanner kind="error" message={errorMessage} />}

      <LabeledInput
        autoComplete="email"
        id={EMAIL_ID}
        inputRef={emailRef}
        label="Email"
        type="email"
        value={email}
        onChange={onEmailChange}
      />
      <LabeledInput
        autoComplete="current-password"
        id={PASSWORD_ID}
        label="Password"
        type="password"
        value={password}
        onChange={onPasswordChange}
      />

      <button style={LOGIN_VIEW_STYLES.submitButton} type="submit">
        Sign in
      </button>
    </form>
  )
}
