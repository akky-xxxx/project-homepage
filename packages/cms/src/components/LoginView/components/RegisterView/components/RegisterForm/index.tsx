"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { authClient } from "@/shared/utilities/authClient"
import { signUpWithCredentials } from "@/shared/utilities/signUpWithCredentials"
import { validateNewPassword } from "@/shared/utilities/validateNewPassword"

import { RegisterFields } from "./components/RegisterFields"

import type { SyntheticEvent } from "react"

// routes.admin: "/" (payload.config.ts) 固定のため、LogoutButton と同様にハードコードする
const ADMIN_PATH = "/"

/**
 * 最初の 1 アカウントを作るためだけのブートストラップ用サインアップフォーム。
 * サーバー側の `assertSignUpAllowed` が既に閉じているため画面上は目立たせない。
 * @returns email/name/password/confirm のフォーム
 */
export const RegisterForm = () => {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validation = validateNewPassword({ confirmNewPassword, newPassword })
    if (!validation.ok) {
      setErrorMessage(validation.message)
      return
    }

    const result = await signUpWithCredentials(authClient, { email, name, password: newPassword })
    if (!result.ok) {
      setErrorMessage(result.message)
      return
    }

    router.replace(ADMIN_PATH)
  }

  return (
    <RegisterFields
      confirmNewPassword={confirmNewPassword}
      email={email}
      errorMessage={errorMessage}
      name={name}
      newPassword={newPassword}
      onConfirmNewPasswordChange={setConfirmNewPassword}
      onEmailChange={setEmail}
      onNameChange={setName}
      onNewPasswordChange={setNewPassword}
      onSubmit={(event) => {
        void handleSubmit(event)
      }}
    />
  )
}
