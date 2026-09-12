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
import { useState } from "react"

import { CONFIRM_PASSWORD_PATH } from "@/shared/const/CONFIRM_PASSWORD_PATH"
import { authClient } from "@/shared/utilities/authClient"
import { readFormValue } from "@/shared/utilities/readFormValue"
import { signUpWithCredentials } from "@/shared/utilities/signUpWithCredentials"
import { useSubmitLock } from "@/shared/utilities/useSubmitLock"
import { validatePasswordField } from "@/shared/utilities/validatePasswordField"

import type { FormState } from "payload"

// routes.admin: "/" (payload.config.ts) 固定のため、LogoutButton と同様にハードコードする
const ADMIN_PATH = "/"

// useField はフォーム state に登録済みのパスしか扱えないため初期 state を明示する
const INITIAL_FORM_STATE: FormState = {
  [CONFIRM_PASSWORD_PATH]: { initialValue: "", valid: false, value: "" },
  email: { initialValue: "", valid: true, value: "" },
  name: { initialValue: "", valid: true, value: "" },
  password: { initialValue: "", valid: true, value: "" },
}

/**
 * フォーム state の値でサインアップする。
 * @param fields Payload のフォーム state
 * @returns 失敗時はエラーメッセージ、成功時は null
 */
const runSignUp = async (fields: FormState): Promise<string | null> => {
  const result = await signUpWithCredentials(authClient, {
    email: readFormValue(fields.email.value),
    name: readFormValue(fields.name.value),
    password: readFormValue(fields.password.value),
  })

  return result.ok ? null : result.message
}

/**
 * 最初の 1 アカウントを作るためだけのブートストラップ用サインアップフォーム。
 * @returns email/name/password/confirm のフォーム
 */
export const RegisterForm = () => {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { isSubmitting, runExclusive } = useSubmitLock()

  return (
    <Form
      className="login-fields"
      initialState={INITIAL_FORM_STATE}
      onSubmit={(fields) => {
        void runExclusive(async () => {
          const message = await runSignUp(fields)

          setErrorMessage(message)
          if (message === null) router.replace(ADMIN_PATH)
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
      <TextField
        field={{ admin: { autoComplete: "name" }, label: "Name", name: "name", required: true }}
        path="name"
      />
      <PasswordField
        autoComplete="new-password"
        field={{ label: "Password", name: "password", required: true }}
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
