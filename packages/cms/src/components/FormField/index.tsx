"use client"

import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

import type { ChangeEvent, HTMLInputAutoCompleteAttribute, JSX } from "react"

type FormFieldProps = {
  autoComplete?: HTMLInputAutoCompleteAttribute
  id: string
  label: string
  type: "email" | "password" | "text"
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

/**
 * ログイン画面のフォーム入力欄1つ分(label + input)。
 * @param props 入力欄の設定
 * @param props.autoComplete input の autocomplete 属性
 * @param props.id input の id(label の htmlFor と対応)
 * @param props.label 表示するラベル文言
 * @param props.onChange 入力変更ハンドラ
 * @param props.type input の type
 * @param props.value 現在の入力値
 * @returns label + input
 */
export const FormField = ({
  autoComplete,
  id,
  label,
  onChange,
  type,
  value,
}: FormFieldProps): JSX.Element => (
  <div style={{ marginBottom: "var(--base)" }}>
    <label htmlFor={id} style={LOGIN_VIEW_STYLES.label}>
      {label}
    </label>
    <input
      required
      autoComplete={autoComplete}
      id={id}
      style={LOGIN_VIEW_STYLES.input}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
)
