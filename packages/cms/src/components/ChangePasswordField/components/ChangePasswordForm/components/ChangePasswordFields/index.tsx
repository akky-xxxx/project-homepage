"use client"

import { Banner, ConfirmPasswordField, FormSubmit, PasswordField, useForm } from "@payloadcms/ui"

import { validatePasswordField } from "@/shared/utilities/validatePasswordField"

import type { KeyboardEvent } from "react"

type ChangePasswordFieldsProps = {
  errorMessage: string | null
  isSubmitting: boolean
  successMessage: string | null
}

/**
 * パスワード変更フォームの見た目と、Enter キーによる送信を担う。
 *
 * 親の `Form` は `el="div"` で描画されるため、入力欄の form owner は外側のドキュメント編集
 * フォームのままになる。この状態で Enter を押すとブラウザの暗黙の送信が外側へ向かい、
 * パスワード変更ではなくユーザードキュメントの保存を誘発する。そのため送信中かどうかに
 * 関わらず必ず `preventDefault()` する。`PasswordField`/`ConfirmPasswordField` は `onKeyDown` を
 * 受け取らないので、入力欄をまとめた要素でバブルした keydown を捕捉している。
 *
 * `useForm()` は `Form` の内側でしか呼べないため、このコンポーネントが橋渡し役になる。
 * @param props 表示するメッセージと送信中フラグ
 * @returns パスワード変更フォームの中身
 */
export const ChangePasswordFields = (props: ChangePasswordFieldsProps) => {
  const { errorMessage, isSubmitting, successMessage } = props
  const { submit } = useForm()

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter") return

    event.preventDefault()
    if (isSubmitting) return

    void submit()
  }

  return (
    <div className="field-type">
      <h3>Password</h3>

      {errorMessage != null && (
        <div aria-live="assertive" role="alert">
          <Banner type="error">{errorMessage}</Banner>
        </div>
      )}
      {successMessage != null && (
        <div aria-live="polite" role="status">
          <Banner type="success">{successMessage}</Banner>
        </div>
      )}

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- 自身は操作対象ではなく、
          子の入力欄からバブルしてくる Enter を 1 か所で捕まえるためのラッパー */}
      <div onKeyDown={handleKeyDown}>
        <PasswordField
          autoComplete="current-password"
          field={{ label: "Current password", name: "currentPassword", required: true }}
          path="currentPassword"
        />
        <PasswordField
          autoComplete="new-password"
          field={{ label: "New password", name: "password", required: true }}
          path="password"
          validate={validatePasswordField}
        />
        <ConfirmPasswordField />
      </div>

      <FormSubmit programmaticSubmit disabled={isSubmitting} size="large" type="button">
        Change password
      </FormSubmit>
    </div>
  )
}
