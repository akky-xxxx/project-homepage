"use client"

import { Fragment } from "react"

import { FormField } from "@/components/FormField"

import type { LoginFormFields } from "@/types/LoginFormFields"
import type { ChangeEvent, JSX } from "react"

type RegistrationFieldsProps = {
  fields: Pick<LoginFormFields, "confirmPassword" | "name">
  onFieldChange: (field: keyof LoginFormFields) => (event: ChangeEvent<HTMLInputElement>) => void
}

/**
 * サインアップ時にのみ表示する入力欄(name / confirmPassword)。
 * @param props フォームの状態と変更ハンドラ
 * @param props.fields 現在の name/confirmPassword の入力値
 * @param props.onFieldChange 入力変更ハンドラを作るファクトリ
 * @returns name/confirmPassword の入力欄
 */
export const RegistrationFields = ({
  fields,
  onFieldChange,
}: RegistrationFieldsProps): JSX.Element => (
  <Fragment>
    <FormField
      id="name"
      label="Name"
      type="text"
      value={fields.name}
      onChange={onFieldChange("name")}
    />
    <FormField
      autoComplete="new-password"
      id="confirmPassword"
      label="Confirm password"
      type="password"
      value={fields.confirmPassword}
      onChange={onFieldChange("confirmPassword")}
    />
  </Fragment>
)
