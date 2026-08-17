"use client"

import { Form } from "@payloadcms/ui"
import { useState } from "react"

import { CHANGE_PASSWORD_FORM_STATE } from "@/shared/const/CHANGE_PASSWORD_FORM_STATE"
import { authClient } from "@/shared/utilities/authClient"
import { changeOwnPassword } from "@/shared/utilities/changeOwnPassword"
import { readFormValue } from "@/shared/utilities/readFormValue"
import { useSubmitLock } from "@/shared/utilities/useSubmitLock"

import { ChangePasswordFields } from "./components/ChangePasswordFields"

import type { FormState } from "payload"

const SUCCESS_MESSAGE = "Password changed."
const INITIAL_SUCCESS_COUNT = 0
const SUCCESS_INCREMENT = 1

/**
 * フォーム state の値でパスワードを変更する。
 * @param fields Payload のフォーム state
 * @returns 失敗時はエラーメッセージ、成功時は null
 */
const runChangePassword = async (fields: FormState): Promise<string | null> => {
  const result = await changeOwnPassword(authClient, {
    currentPassword: readFormValue(fields.currentPassword.value),
    newPassword: readFormValue(fields.password.value),
  })

  return result.ok ? null : result.message
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
  // 成功メッセージは 2 回目以降も同じ文字列なので、リセットの契機には使えない
  // (同じ値の set では再描画されず、子の effect が再実行されない)。成功のたびに必ず変わる
  // 値が要るため、回数を数える
  const [successCount, setSuccessCount] = useState(INITIAL_SUCCESS_COUNT)
  const { isSubmitting, runExclusive } = useSubmitLock()

  return (
    <Form
      el="div"
      initialState={CHANGE_PASSWORD_FORM_STATE}
      onSubmit={(fields) => {
        void runExclusive(async () => {
          setSuccessMessage(null)

          const message = await runChangePassword(fields)

          setErrorMessage(message)
          if (message !== null) return

          setSuccessMessage(SUCCESS_MESSAGE)
          setSuccessCount((current) => current + SUCCESS_INCREMENT)
        })
      }}
    >
      <ChangePasswordFields
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
        successCount={successCount}
        successMessage={successMessage}
      />
    </Form>
  )
}
