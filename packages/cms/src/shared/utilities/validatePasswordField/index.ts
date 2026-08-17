import { CONFIRM_PASSWORD_PATH } from "@/shared/const/CONFIRM_PASSWORD_PATH"
import { readFormValue } from "@/shared/utilities/readFormValue"
import { validateNewPassword } from "@/shared/utilities/validateNewPassword"

import type { Validate } from "payload"

type PasswordSiblingData = { [CONFIRM_PASSWORD_PATH]?: unknown }

/**
 * Payload の `PasswordField` に渡す、新パスワード用のバリデータ。
 * 既存の `validateNewPassword` をそのまま使い、最小長と確認用入力との一致を検証する。
 * 一致判定は `ConfirmPasswordField` 側でも行われて重複するが、パスワード欄にもメッセージを
 * 出したいので両方に効かせている。エラーの表示は初回送信後のみ(`useField` の `showError`)。
 * @param value 入力値
 * @param options Payload のバリデーションオプション
 * @returns 合格なら true、不合格ならメッセージ
 */
export const validatePasswordField: Validate<string, unknown, PasswordSiblingData> = (
  value,
  options,
) => {
  const result = validateNewPassword({
    confirmNewPassword: readFormValue(options.siblingData[CONFIRM_PASSWORD_PATH]),
    newPassword: readFormValue(value),
  })

  return result.ok ? true : result.message
}
