"use client"

import { useEffect, useRef, useState } from "react"

import { authClient } from "@/shared/utilities/authClient"
import { signInWithPassword } from "@/shared/utilities/signInWithPassword"
import { toPasswordSignInClient } from "@/shared/utilities/toPasswordSignInClient"

import { PasswordCredentialsFields } from "./components/PasswordCredentialsFields"

import type { SyntheticEvent } from "react"

type PasswordCredentialsFormProps = {
  formId: string
  isOpen: boolean
  onRequireTwoFactor: () => void
  onSignedIn: () => void
}

/**
 * email/password の入力状態と送信処理を持つ。開閉は `isOpen` に応じた `hidden` 属性で行い、
 * `PasswordSignInForm`(トグルボタン)がマウントしたまま入力値を保持する。
 * @param props フォーム id・開閉状態・コールバック(2FA 要求時・サインイン成功時)
 * @returns email/password のサインインフォーム
 */
export const PasswordCredentialsForm = (props: PasswordCredentialsFormProps) => {
  const { formId, isOpen, onRequireTwoFactor, onSignedIn } = props

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) emailRef.current?.focus()
  }, [isOpen])

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await signInWithPassword(toPasswordSignInClient(authClient), {
      email,
      password,
    })

    if (result.status === "error") {
      setErrorMessage(result.message)
      return
    }

    if (result.status === "twoFactorRequired") {
      onRequireTwoFactor()
      return
    }

    onSignedIn()
  }

  return (
    <PasswordCredentialsFields
      email={email}
      emailRef={emailRef}
      errorMessage={errorMessage}
      formId={formId}
      isOpen={isOpen}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={(event) => {
        void handleSubmit(event)
      }}
    />
  )
}
