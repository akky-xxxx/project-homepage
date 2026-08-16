"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { createLoginOutcomeHandler } from "@/shared/utilities/createLoginOutcomeHandler"
import { createLoginViewAuthClient } from "@/shared/utilities/createLoginViewAuthClient"
import { signInWithCredentials } from "@/shared/utilities/signInWithCredentials"
import { signInWithPasskey } from "@/shared/utilities/signInWithPasskey"
import { signUpWithCredentials } from "@/shared/utilities/signUpWithCredentials"

import type { LoginFormFields } from "@/types/LoginFormFields"
import type { LoginOutcome } from "@/types/LoginOutcome"
import type { ChangeEvent, SyntheticEvent } from "react"

const EMPTY_FIELDS: LoginFormFields = { confirmPassword: "", email: "", name: "", password: "" }

type Step = "credentials" | "secondFactor"
type View = "login" | "register" | "secondFactor"
type LoadingAction = "credentials" | "passkey"

type UseLoginViewResult = {
  step: Step
  isRegistering: boolean
  toggleIsRegistering: () => void

  fields: LoginFormFields
  onFieldChange: (field: keyof LoginFormFields) => (event: ChangeEvent<HTMLInputElement>) => void

  error: string | null
  isLoading: boolean
  isPasskeyLoading: boolean

  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void
  handlePasskeySignIn: () => void
}

/**
 * cms のログイン画面(password/サインアップ/passkey)の状態と操作をまとめたフック。
 * @returns 画面の状態と操作ハンドラ
 */
export const useLoginView = (): UseLoginViewResult => {
  const router = useRouter()
  const [client] = useState(createLoginViewAuthClient)
  const [view, setView] = useState<View>("login")
  const [fields, setFields] = useState<LoginFormFields>(EMPTY_FIELDS)
  const [error, setError] = useState<string | null>(null)
  const [loadingAction, setLoadingAction] = useState<LoadingAction | null>(null)

  const handleOutcome = createLoginOutcomeHandler(router, setError, () => {
    setView("secondFactor")
  })

  const runAction = (action: LoadingAction, promise: Promise<LoginOutcome>): void => {
    setLoadingAction(action)
    setError(null)

    void promise.then(handleOutcome).finally(() => {
      setLoadingAction(null)
    })
  }

  return {
    error,
    fields,
    handlePasskeySignIn: () => {
      runAction("passkey", signInWithPasskey(client))
    },
    handleSubmit: (event) => {
      event.preventDefault()
      const action =
        view === "register"
          ? signUpWithCredentials(client, fields)
          : signInWithCredentials(client, fields)
      runAction("credentials", action)
    },
    isLoading: loadingAction === "credentials",
    isPasskeyLoading: loadingAction === "passkey",
    isRegistering: view === "register",
    onFieldChange: (field) => (event) => {
      setFields((current) => ({ ...current, [field]: event.target.value }))
    },
    step: view === "secondFactor" ? "secondFactor" : "credentials",
    toggleIsRegistering: () => {
      setView((current) => (current === "register" ? "login" : "register"))
      setError(null)
    },
  }
}
