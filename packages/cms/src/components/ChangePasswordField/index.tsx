"use client"

import { useAuth, useDocumentInfo } from "@payloadcms/ui"

import { resolveChangePasswordFieldView } from "@/shared/utilities/resolveChangePasswordFieldView"

import { ChangePasswordForm } from "./components/ChangePasswordForm"

/**
 * `Users` コレクションの詳細画面に埋め込む、自分自身のパスワードを変更するための `ui` フィールド。
 * better-auth コアの `changePassword` はセッションユーザーに対して作用する API のため、
 * 閲覧中のドキュメントとセッションユーザーが一致しない場合はフォームを描画せず、
 * ライブラリ標準の `TwoFactorField`/`PasskeysField` と同じプレースホルダ文言のみ表示する。
 * どちらの id もまだ確定していない間は所有者かどうかを判定できないため、何も描画しない。
 * @returns パスワード変更フォーム、他人のドキュメント閲覧時のプレースホルダ、または `null`
 */
export const ChangePasswordField = () => {
  const { id: documentId } = useDocumentInfo()
  const { user } = useAuth()

  const view = resolveChangePasswordFieldView({ documentId, userId: user?.id })

  if (view === "hidden") return null

  if (view === "notOwner")
    return (
      <div className="field-type">
        <p className="field-description">Password can only be changed by the account owner.</p>
      </div>
    )

  return <ChangePasswordForm />
}
