"use client"

import { Banner, EmailField, Form, FormSubmit, PasswordField } from "@payloadcms/ui"
import { useRef, useState } from "react"

import { authClient } from "@/shared/utilities/authClient"
import { readFormValue } from "@/shared/utilities/readFormValue"
import { signInWithPassword } from "@/shared/utilities/signInWithPassword"
import { toPasswordSignInClient } from "@/shared/utilities/toPasswordSignInClient"

import type { FormState } from "payload"

// useField はフォーム state に登録済みのパスしか扱えないため、Payload 標準のログイン画面と
// 同じく初期 state を明示する(@payloadcms/next の dist/views/Login/LoginForm/index.js)
const INITIAL_FORM_STATE: FormState = {
  email: { initialValue: "", valid: true, value: "" },
  password: { initialValue: "", valid: true, value: "" },
}

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
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Payload の `Form` は `onSubmit` の非同期処理を待たず、直後に processing/disabled を解除する
  // (@payloadcms/ui の dist/forms/Form/index.js)。state の反映を待たずに同期的に再入を弾くため、
  // 表示用の isSubmitting とは別に ref のロックを持つ
  const isSubmittingRef = useRef(false)

  const handleSubmit = async (fields: FormState) => {
    if (isSubmittingRef.current) return
    isSubmittingRef.current = true
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const result = await signInWithPassword(toPasswordSignInClient(authClient), {
        email: readFormValue(fields.email?.value),
        password: readFormValue(fields.password?.value),
      })

      if (result.status === "error") {
        setErrorMessage(result.message)
        return
      }

      if (result.status === "twoFactorRequired") {
        onRequireTwoFactor()
        return
      }

      onSignedIn()
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <Form
      className="login-fields"
      initialState={INITIAL_FORM_STATE}
      onSubmit={(fields) => {
        void handleSubmit(fields)
      }}
    >
      {errorMessage != null && (
        <div aria-live="assertive" role="alert">
          <Banner type="error">{errorMessage}</Banner>
        </div>
      )}

      <EmailField
        field={{ name: "email", admin: { autoComplete: "email" }, label: "Email", required: true }}
        path="email"
      />
      <PasswordField
        autoComplete="current-password"
        field={{ name: "password", label: "Password", required: true }}
        path="password"
      />

      <FormSubmit disabled={isSubmitting} size="large">
        Sign in
      </FormSubmit>
    </Form>
  )
}
