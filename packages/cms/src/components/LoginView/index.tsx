"use client"

import { CredentialsForm } from "@/components/CredentialsForm"
import { SecondFactorStep } from "@/components/SecondFactorStep"
import { useLoginView } from "@/shared/utilities/useLoginView"

import type { JSX } from "react"

/**
 * cms 管理画面のログイン画面。password は常時必須の第1要素で、第2要素
 * (TOTP/backup code または passkey)の要求はサーバー側が担う。
 * `signIn.email` の応答が `twoFactorRedirect` を返したら第2要素の画面へ切り替える。
 * @returns ログイン画面
 */
export const LoginView = (): JSX.Element => {
  const loginView = useLoginView()

  if (loginView.step === "secondFactor") {
    return (
      <SecondFactorStep
        isPasskeyLoading={loginView.isPasskeyLoading}
        onPasskeySignIn={loginView.handlePasskeySignIn}
      />
    )
  }

  return (
    <CredentialsForm
      error={loginView.error}
      fields={loginView.fields}
      isLoading={loginView.isLoading}
      isRegistering={loginView.isRegistering}
      onFieldChange={loginView.onFieldChange}
      onSubmit={loginView.handleSubmit}
      onToggleIsRegistering={loginView.toggleIsRegistering}
    />
  )
}
