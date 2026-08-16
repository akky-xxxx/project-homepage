import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

import type { Ref } from "react"

type LabeledInputProps = {
  autoComplete: HTMLInputElement["autocomplete"]
  id: string
  inputRef?: Ref<HTMLInputElement>
  label: string
  type: "email" | "password" | "text"
  value: string
  onChange: (value: string) => void
}

/**
 * `LoginView` 配下のフォームで共有する、`<label>` と対応付けた `<input>`。
 * `autoComplete` は 1Password 等のパスワードマネージャーがフィールドを正しく
 * 認識するために必須(このログイン方式の作り直し自体が 1Password 経由での
 * ログインしづらさを解消する目的のため)。
 * @param props フィールドの id・ラベル・型・値・変更ハンドラ(必要なら ref)
 * @returns ラベル付き入力欄
 */
export const LabeledInput = (props: LabeledInputProps) => {
  const { autoComplete, id, inputRef, label, type, value, onChange } = props

  return (
    <div>
      <label htmlFor={id} style={LOGIN_VIEW_STYLES.label}>
        {label}
      </label>
      <input
        ref={inputRef}
        required
        autoComplete={autoComplete}
        id={id}
        style={LOGIN_VIEW_STYLES.input}
        type={type}
        value={value}
        onChange={(event) => {
          onChange(event.target.value)
        }}
      />
    </div>
  )
}
