"use client"

import { Form } from "@payloadcms/ui"
import { useRef, useState } from "react"

import { CONFIRM_PASSWORD_PATH } from "@/shared/const/CONFIRM_PASSWORD_PATH"
import { authClient } from "@/shared/utilities/authClient"
import { changeOwnPassword } from "@/shared/utilities/changeOwnPassword"
import { readFormValue } from "@/shared/utilities/readFormValue"

import { ChangePasswordFields } from "./components/ChangePasswordFields"

import type { FormState } from "payload"

const SUCCESS_MESSAGE = "Password changed."

// useField はフォーム state に登録済みのパスしか扱えないため初期 state を明示する。
// 新パスワードは ConfirmPasswordField の検証対象に合わせて "password" に固定する
const INITIAL_FORM_STATE: FormState = {
  [CONFIRM_PASSWORD_PATH]: { initialValue: "", valid: false, value: "" },
  currentPassword: { initialValue: "", valid: true, value: "" },
  password: { initialValue: "", valid: true, value: "" },
}

/**
 * パスワード変更の送信処理を持つフォーム。
 *
 * `el="div"` で描画するのは、このコンポーネントが Payload のドキュメント編集画面
 * (既に `<form>` でラップ済み)の内側に置かれるため。`<form>` を入れ子にすると無効な HTML と
 * hydration mismatch を招く。ただし DOM 上が `<div>` になることで入力欄の form owner は
 * 外側のドキュメント編集フォームのままになるので、Enter キーの既定動作を明示的に止める必要が
 * ある(`ChangePasswordFields` が担当)。
 * @returns パスワード変更フォーム
 */
export const ChangePasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Payload の `Form` は `onSubmit` の非同期処理を待たず、直後に processing/disabled を解除する
  // ため、state の反映を待たずに同期的に再入を弾く ref のロックを別に持つ
  const isSubmittingRef = useRef(false)

  const handleSubmit = async (fields: FormState) => {
    if (isSubmittingRef.current) return
    isSubmittingRef.current = true
    setIsSubmitting(true)
    setSuccessMessage(null)

    try {
      const result = await changeOwnPassword(authClient, {
        currentPassword: readFormValue(fields.currentPassword?.value),
        newPassword: readFormValue(fields.password?.value),
      })

      if (!result.ok) {
        setErrorMessage(result.message)
        return
      }

      setErrorMessage(null)
      setSuccessMessage(SUCCESS_MESSAGE)
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <Form
      el="div"
      initialState={INITIAL_FORM_STATE}
      onSubmit={(fields) => {
        void handleSubmit(fields)
      }}
    >
      <ChangePasswordFields
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
        successMessage={successMessage}
      />
    </Form>
  )
}
