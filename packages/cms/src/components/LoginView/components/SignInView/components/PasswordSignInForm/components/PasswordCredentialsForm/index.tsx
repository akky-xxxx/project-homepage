"use client"

import { Banner, EmailField, Form, FormSubmit, PasswordField } from "@payloadcms/ui"
import { useState } from "react"

import { authClient } from "@/shared/utilities/authClient"
import { readFormValue } from "@/shared/utilities/readFormValue"
import { signInWithPassword } from "@/shared/utilities/signInWithPassword"
import { toPasswordSignInClient } from "@/shared/utilities/toPasswordSignInClient"
import { useSubmitLock } from "@/shared/utilities/useSubmitLock"

import type { SignInWithPasswordResult } from "@/shared/utilities/signInWithPassword"
import type { FormState } from "payload"

// useField はフォーム state に登録済みのパスしか扱えないため、Payload 標準のログイン画面と
// 同じく初期 state を明示する(@payloadcms/next の dist/views/Login/LoginForm/index.js)
const INITIAL_FORM_STATE: FormState = {
  email: { initialValue: "", valid: true, value: "" },
  password: { initialValue: "", valid: true, value: "" },
}

/**
 * フォーム state の値で Better Auth のサインインを実行する。
 * @param fields Payload のフォーム state
 * @returns サインイン結果(成功 / 2FA 要求 / エラー)
 */
const runSignIn = async (fields: FormState): Promise<SignInWithPasswordResult> =>
  signInWithPassword(toPasswordSignInClient(authClient), {
    email: readFormValue(fields.email.value),
    password: readFormValue(fields.password.value),
  })

type PasswordCredentialsFormProps = {
  onRequireTwoFactor: () => void
  onSignedIn: () => void
}

/**
 * email/password の入力と送信を担うフォーム。フォーム state・バリデーション・エラー表示は
 * Payload の `Form` と各 Field に委ね、送信時に Better Auth を呼ぶ配線だけを持つ。
 * @param props コールバック(2FA 要求時・サインイン成功時)
 * @returns email/password のサインインフォーム
 */
export const PasswordCredentialsForm = (props: PasswordCredentialsFormProps) => {
  const { onRequireTwoFactor, onSignedIn } = props

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { isSubmitting, runExclusive } = useSubmitLock()

  return (
    <Form
      className="login-fields"
      initialState={INITIAL_FORM_STATE}
      onSubmit={(fields) => {
        void runExclusive(async () => {
          const result = await runSignIn(fields)

          setErrorMessage(result.status === "error" ? result.message : null)
          if (result.status === "twoFactorRequired") onRequireTwoFactor()
          if (result.status === "signedIn") onSignedIn()
        })
      }}
    >
      {errorMessage == null ? null : (
        <div aria-live="assertive" role="alert">
          <Banner type="error">{errorMessage}</Banner>
        </div>
      )}

      <EmailField
        field={{ admin: { autoComplete: "email" }, label: "Email", name: "email", required: true }}
        path="email"
      />
      <PasswordField
        autoComplete="current-password"
        field={{ label: "Password", name: "password", required: true }}
        path="password"
      />

      <FormSubmit disabled={isSubmitting} size="large">
        Sign in
      </FormSubmit>
    </Form>
  )
}
