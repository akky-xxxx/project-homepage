"use client"

import { useAuth, useDocumentInfo } from "@payloadcms/ui"

import { ChangePasswordForm } from "./components/ChangePasswordForm"

/**
 * `Users` コレクションの詳細画面に埋め込む、自分自身のパスワードを変更するための `ui` フィールド。
 * better-auth コアの `changePassword` はセッションユーザーに対して作用する API のため、
 * 閲覧中のドキュメントとセッションユーザーが一致しない場合はフォームを描画せず、
 * ライブラリ標準の `TwoFactorField`/`PasskeysField` と同じプレースホルダ文言のみ表示する。
 * @returns パスワード変更フォーム、または他人のドキュメント閲覧時のプレースホルダ
 */
export const ChangePasswordField = () => {
  const { id: documentId } = useDocumentInfo()
  const { user } = useAuth()

  if (String(documentId) !== String(user?.id)) {
    return (
      <div className="field-type">
        <p className="field-description">Password can only be changed by the account owner.</p>
      </div>
    )
  }

  return <ChangePasswordForm />
}
