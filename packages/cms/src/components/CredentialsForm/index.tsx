"use client"

import { AuthCard } from "@/components/AuthCard"
import { ErrorBanner } from "@/components/ErrorBanner"
import { FormField } from "@/components/FormField"
import { RegistrationFields } from "@/components/RegistrationFields"
import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

import type { LoginFormFields } from "@/types/LoginFormFields"
import type { ChangeEvent, JSX, SyntheticEvent } from "react"

const getSubmitLabel = (state: { isLoading: boolean; isRegistering: boolean }): string => {
  if (state.isLoading) return "Please wait..."
  return state.isRegistering ? "Create account" : "Sign in"
}

type CredentialsFormProps = {
  isRegistering: boolean
  onToggleIsRegistering: () => void

  fields: LoginFormFields
  onFieldChange: (field: keyof LoginFormFields) => (event: ChangeEvent<HTMLInputElement>) => void

  error: string | null
  isLoading: boolean
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void
}

/**
 * password(+サインアップ)を入力する、ログイン画面の最初のステップ。
 * @param props フォームの状態と操作ハンドラ
 * @returns password/サインアップフォーム
 */
export const CredentialsForm = (props: CredentialsFormProps): JSX.Element => {
  const {
    error,
    fields,
    isLoading,
    isRegistering,
    onFieldChange,
    onSubmit,
    onToggleIsRegistering,
  } = props

  const submitLabel = getSubmitLabel({ isLoading, isRegistering })

  return (
    <AuthCard title={isRegistering ? "Create account" : "Login"}>
      <form onSubmit={onSubmit}>
        {isRegistering ? (
          <RegistrationFields fields={fields} onFieldChange={onFieldChange} />
        ) : null}

        <FormField
          autoComplete="email"
          id="email"
          label="Email"
          type="email"
          value={fields.email}
          onChange={onFieldChange("email")}
        />

        <FormField
          autoComplete={isRegistering ? "new-password" : "current-password"}
          id="password"
          label="Password"
          type="password"
          value={fields.password}
          onChange={onFieldChange("password")}
        />

        <ErrorBanner message={error} />

        <button disabled={isLoading} style={LOGIN_VIEW_STYLES.primaryButton} type="submit">
          {submitLabel}
        </button>
      </form>

      <button style={LOGIN_VIEW_STYLES.linkButton} type="button" onClick={onToggleIsRegistering}>
        {isRegistering ? "Already have an account? Sign in" : "Create the first account"}
      </button>
    </AuthCard>
  )
}
