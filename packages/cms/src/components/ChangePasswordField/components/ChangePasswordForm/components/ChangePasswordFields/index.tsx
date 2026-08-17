"use client"

import { Banner, ConfirmPasswordField, FormSubmit, PasswordField, useForm } from "@payloadcms/ui"
import { useEffect } from "react"

import { CHANGE_PASSWORD_FORM_STATE } from "@/shared/const/CHANGE_PASSWORD_FORM_STATE"
import { validatePasswordField } from "@/shared/utilities/validatePasswordField"

import type { KeyboardEvent } from "react"

const NO_SUCCESS_YET = 0

type ChangePasswordFieldsProps = {
  errorMessage: string | null
  isSubmitting: boolean
  successCount: number
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
  const { errorMessage, isSubmitting, successCount, successMessage } = props
  const { replaceState, submit } = useForm()

  // 変更に成功するたび 3 欄を空に戻し、画面に平文のパスワードを残さない。
  // `reset` はサーバー側の `getFormState` を呼ぶためコレクションに属さないこのフォームでは
  // 使えないので、クライアント側だけで完結する `replaceState` を使う。
  // 契機に成功回数を使うのは、2 回目以降も成功メッセージが同じ文字列で変化しないため。
  // 失敗時は再入力の手間を避けるため値を残す
  useEffect(() => {
    if (successCount === NO_SUCCESS_YET) return

    replaceState(CHANGE_PASSWORD_FORM_STATE)
  }, [replaceState, successCount])

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

      {/* `render-fields` は余白のためだけに付けている。フィールド間の余白は Payload 側の
          `.render-fields > .field-type` が与えており、各フィールドが自分で出す `field-type` だけでは
          余白が付かない */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- 自身は操作対象ではなく、
          子の入力欄からバブルしてくる Enter を 1 か所で捕まえるためのラッパー */}
      <div className="render-fields" onKeyDown={handleKeyDown}>
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
