"use client"

import { useState } from "react"

import { authClient } from "@/shared/utilities/authClient"
import { changeOwnPassword } from "@/shared/utilities/changeOwnPassword"
import { validateNewPassword } from "@/shared/utilities/validateNewPassword"

import { ChangePasswordFields } from "./components/ChangePasswordFields"

const INITIAL_VALUES = { confirmNewPassword: "", currentPassword: "", newPassword: "" }
const SUCCESS_MESSAGE = "Password changed."

type ChangePasswordFormResult =
  | { status: "error"; message: string }
  | { status: "invalid"; message: string }
  | { status: "success" }

/**
 * クライアント側検証(`validateNewPassword`)を通してから `changeOwnPassword` を呼ぶ。
 * @param values 現在のパスワード・新パスワード・確認用パスワード
 * @returns 検証エラー・API エラー・成功のいずれか
 */
const submitChangePassword = async (
  values: typeof INITIAL_VALUES,
): Promise<ChangePasswordFormResult> => {
  const { confirmNewPassword, currentPassword, newPassword } = values

  const validation = validateNewPassword({ confirmNewPassword, newPassword })
  if (!validation.ok) {
    return { message: validation.message, status: "invalid" }
  }

  const result = await changeOwnPassword(authClient, { currentPassword, newPassword })
  if (!result.ok) {
    return { message: result.message, status: "error" }
  }

  return { status: "success" }
}

/**
 * 現在のパスワード・新パスワード・確認用パスワードの入力状態と送信処理を持つ。
 * @returns パスワード変更フォーム
 */
export const ChangePasswordForm = () => {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async () => {
    setSuccessMessage(null)

    const result = await submitChangePassword(values)
    if (result.status !== "success") {
      setErrorMessage(result.message)
      return
    }

    setErrorMessage(null)
    setSuccessMessage(SUCCESS_MESSAGE)
    setValues(INITIAL_VALUES)
  }

  return (
    <ChangePasswordFields
      confirmNewPassword={values.confirmNewPassword}
      currentPassword={values.currentPassword}
      errorMessage={errorMessage}
      newPassword={values.newPassword}
      successMessage={successMessage}
      onConfirmNewPasswordChange={(value) => {
        setValues((previous) => ({ ...previous, confirmNewPassword: value }))
      }}
      onCurrentPasswordChange={(value) => {
        setValues((previous) => ({ ...previous, currentPassword: value }))
      }}
      onNewPasswordChange={(value) => {
        setValues((previous) => ({ ...previous, newPassword: value }))
      }}
      onSubmit={() => {
        void handleSubmit()
      }}
    />
  )
}
