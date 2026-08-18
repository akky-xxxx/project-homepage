type ResolveChangePasswordFieldViewInput = {
  documentId: number | string | undefined
  userId: number | string | null | undefined
}

/** パスワード変更フィールドが描画する内容の種別 */
type ChangePasswordFieldView = "form" | "hidden" | "notOwner"

/**
 * `ChangePasswordField` が何を描画するかを決める。
 * `useAuth().user` は `/api/users/me` の解決前や取得失敗時に不在になり、`useDocumentInfo().id` は
 * 新規作成画面で不在になる。どちらの不在も「所有者ではない」ではなく「まだ判定できない」なので、
 * 所有者不一致のプレースホルダとは区別して何も描画しない状態に倒す。
 * @param input 閲覧中ドキュメントの id とセッションユーザーの id
 * @param input.documentId 閲覧中ドキュメントの id
 * @param input.userId セッションユーザーの id
 * @returns 描画する内容の種別
 */
export const resolveChangePasswordFieldView = ({
  documentId,
  userId,
}: ResolveChangePasswordFieldViewInput): ChangePasswordFieldView => {
  if (documentId == null || userId == null) return "hidden"

  // Payload の id は number / string どちらも取り得るため、存在が確定した値だけ文字列化して比較する
  return String(documentId) === String(userId) ? "form" : "notOwner"
}
