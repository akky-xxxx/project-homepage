"use client"

import { PasskeySignInButton } from "@delmaredigital/payload-better-auth/components/passkey"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { AuthBanner } from "@/components/LoginView/components/AuthBanner"
import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"
import { authClient } from "@/shared/utilities/authClient"

import { PasswordSignInForm } from "./components/PasswordSignInForm"

import type { SyntheticEvent } from "react"

// routes.admin: "/" (payload.config.ts) 固定のため、LogoutButton と同様にハードコードする
const ADMIN_PATH = "/"

type SignInViewProps = {
  onNavigateToRegister: () => void
  onRequireTwoFactor: () => void
}

/**
 * passkey を主 CTA として描画するサインイン画面。password + email での
 * サインインはトグルで開閉するフォーム(`PasswordSignInForm`)に格納し、視認性を落としている。
 * @param props コールバック(2FA 要求時・サインアップ導線への遷移時)
 * @returns サインイン画面
 */
export const SignInView = (props: SignInViewProps) => {
  const { onNavigateToRegister, onRequireTwoFactor } = props
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // PasskeySignInButtonProps extends ButtonHTMLAttributes, whose native `onError`
  // (SyntheticEvent) collides with the component's own `onError: string` in the
  // intersected prop type. The component itself always calls this with a string
  // (dist/components/PasskeySignInButton.js), so narrow defensively.
  const handlePasskeyError = (message: SyntheticEvent<HTMLButtonElement> | string) => {
    if (typeof message === "string") setErrorMessage(message)
  }

  return (
    <div style={LOGIN_VIEW_STYLES.card}>
      <h1>Sign in</h1>

      {errorMessage != null && <AuthBanner kind="error" message={errorMessage} />}

      <PasskeySignInButton
        authClient={authClient}
        onError={handlePasskeyError}
        onSuccess={() => {
          router.replace(ADMIN_PATH)
        }}
      />

      <PasswordSignInForm
        onRequireTwoFactor={onRequireTwoFactor}
        onSignedIn={() => {
          router.replace(ADMIN_PATH)
        }}
      />

      <button style={LOGIN_VIEW_STYLES.link} type="button" onClick={onNavigateToRegister}>
        Create the first admin account
      </button>
    </div>
  )
}
