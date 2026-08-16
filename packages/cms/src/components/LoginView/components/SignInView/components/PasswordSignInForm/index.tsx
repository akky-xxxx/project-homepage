"use client"

import { useId, useState } from "react"

import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

import { PasswordCredentialsForm } from "./components/PasswordCredentialsForm"

type PasswordSignInFormProps = {
  onRequireTwoFactor: () => void
  onSignedIn: () => void
}

/**
 * passkey サインインの下に置く、折りたたみ式の email/password サインイン導線。
 * トグルボタンで `PasswordCredentialsForm` の表示/非表示を切り替える。
 * @param props コールバック(2FA 要求時・サインイン成功時)
 * @returns トグルボタンとサインインフォーム
 */
export const PasswordSignInForm = (props: PasswordSignInFormProps) => {
  const { onRequireTwoFactor, onSignedIn } = props
  const [isOpen, setIsOpen] = useState(false)
  const formId = useId()

  return (
    <div>
      <button
        aria-controls={formId}
        aria-expanded={isOpen}
        style={LOGIN_VIEW_STYLES.toggleButton}
        type="button"
        onClick={() => {
          setIsOpen((current) => !current)
        }}
      >
        Use a password instead
      </button>

      <PasswordCredentialsForm
        formId={formId}
        isOpen={isOpen}
        onRequireTwoFactor={onRequireTwoFactor}
        onSignedIn={onSignedIn}
      />
    </div>
  )
}
