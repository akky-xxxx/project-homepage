"use client"

import { Button } from "@payloadcms/ui"
import { useEffect, useId, useState } from "react"

import { PasswordCredentialsForm } from "./components/PasswordCredentialsForm"

// EmailField は inputRef を受け取らないため、Payload が付与する `field-<path>` の id で参照する
const EMAIL_FIELD_SELECTOR = "#field-email"

type PasswordSignInFormProps = {
  onRequireTwoFactor: () => void
  onSignedIn: () => void
}

/**
 * passkey サインインの下に置く、折りたたみ式の email/password サインイン導線。
 * トグルボタンで `PasswordCredentialsForm` の表示/非表示を切り替える。閉じている間も
 * マウントしたままにして入力値を保持する。
 * @param props コールバック(2FA 要求時・サインイン成功時)
 * @returns トグルボタンとサインインフォーム
 */
export const PasswordSignInForm = (props: PasswordSignInFormProps) => {
  const { onRequireTwoFactor, onSignedIn } = props
  const [isOpen, setIsOpen] = useState(false)
  const formId = useId()

  useEffect(() => {
    if (!isOpen) return

    document.querySelector<HTMLInputElement>(EMAIL_FIELD_SELECTOR)?.focus()
  }, [isOpen])

  return (
    <div className="login-fields">
      <Button
        buttonStyle="secondary"
        // eslint-disable-next-line @typescript-eslint/naming-convention -- ARIA 属性名は kebab-case で固定
        extraButtonProps={{ "aria-controls": formId, "aria-expanded": isOpen }}
        margin={false}
        size="large"
        onClick={() => {
          setIsOpen((current) => !current)
        }}
      >
        Use a password instead
      </Button>

      <div hidden={!isOpen} id={formId}>
        <PasswordCredentialsForm onRequireTwoFactor={onRequireTwoFactor} onSignedIn={onSignedIn} />
      </div>
    </div>
  )
}
