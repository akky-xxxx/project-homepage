"use client"

import {
  Banner,
  ConfirmPasswordField,
  EmailField,
  Form,
  FormSubmit,
  PasswordField,
  TextField,
} from "@payloadcms/ui"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

import { CONFIRM_PASSWORD_PATH } from "@/shared/const/CONFIRM_PASSWORD_PATH"
import { authClient } from "@/shared/utilities/authClient"
import { readFormValue } from "@/shared/utilities/readFormValue"
import { signUpWithCredentials } from "@/shared/utilities/signUpWithCredentials"
import { validatePasswordField } from "@/shared/utilities/validatePasswordField"

import type { FormState } from "payload"

// routes.admin: "/" (payload.config.ts) 固定のため、LogoutButton と同様にハードコードする
const ADMIN_PATH = "/"

// useField はフォーム state に登録済みのパスしか扱えないため、Payload 標準のログイン画面と
// 同じく初期 state を明示する(@payloadcms/next の dist/views/Login/LoginForm/index.js)
const INITIAL_FORM_STATE: FormState = {
  [CONFIRM_PASSWORD_PATH]: { initialValue: "", valid: false, value: "" },
  email: { initialValue: "", valid: true, value: "" },
  name: { initialValue: "", valid: true, value: "" },
  password: { initialValue: "", valid: true, value: "" },
}

/**
 * 最初の 1 アカウントを作るためだけのブートストラップ用サインアップフォーム。
 * サーバー側の `assertSignUpAllowed` が既に閉じているため画面上は目立たせない。
 * @returns email/name/password/confirm のフォーム
 */
export const RegisterForm = () => {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Payload の `Form` は `onSubmit` の非同期処理を待たず、直後に processing/disabled を解除する
  // ため、state の反映を待たずに同期的に再入を弾く ref のロックを別に持つ
  const isSubmittingRef = useRef(false)

  const handleSubmit = async (fields: FormState) => {
    if (isSubmittingRef.current) return
    isSubmittingRef.current = true
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const result = await signUpWithCredentials(authClient, {
        email: readFormValue(fields.email?.value),
        name: readFormValue(fields.name?.value),
        password: readFormValue(fields.password?.value),
      })

      if (!result.ok) {
        setErrorMessage(result.message)
        return
      }

      router.replace(ADMIN_PATH)
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
      <TextField
        field={{ name: "name", admin: { autoComplete: "name" }, label: "Name", required: true }}
        path="name"
      />
      <PasswordField
        autoComplete="new-password"
        field={{ name: "password", label: "Password", required: true }}
        path="password"
        validate={validatePasswordField}
      />
      <ConfirmPasswordField />

      <FormSubmit disabled={isSubmitting} size="large">
        Create account
      </FormSubmit>
    </Form>
  )
}
