import { CONFIRM_PASSWORD_PATH } from "@/shared/const/CONFIRM_PASSWORD_PATH"

import type { FormState } from "payload"

/**
 * パスワード変更フォームの初期 state。
 * `useField` はフォーム state に登録済みのパスしか扱えないため初期値を明示する。新パスワードは
 * `ConfirmPasswordField` の検証対象(`siblingData.password`)に合わせて `"password"` に固定する。
 * 変更成功後に入力値を消すための復帰先としても使う。
 */
export const CHANGE_PASSWORD_FORM_STATE: FormState = {
  [CONFIRM_PASSWORD_PATH]: { initialValue: "", valid: false, value: "" },
  currentPassword: { initialValue: "", valid: true, value: "" },
  password: { initialValue: "", valid: true, value: "" },
}
