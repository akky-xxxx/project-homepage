"use client"

import { PasskeySignInButton } from "@delmaredigital/payload-better-auth/components/passkey"
import { Banner, Button } from "@payloadcms/ui"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { authClient } from "@/shared/utilities/authClient"

import { PasswordSignInForm } from "./components/PasswordSignInForm"

import type { SyntheticEvent } from "react"

// routes.admin: "/" (payload.config.ts) 固定のため、LogoutButton と同様にハードコードする
const ADMIN_PATH = "/"

// PasskeySignInButton は受け取った props を素の <button> に spread するため、Payload の Button と
// 同じクラスを渡して見た目を揃える(ベンダーコンポーネントを置き換えずに済ませるため)。
const PASSKEY_BUTTON_CLASS = "btn btn--style-primary btn--size-large btn--no-margin"

type SignInViewProps = {
  onNavigateToRegister: () => void
  onRequireTwoFactor: () => void
}

/**
 * passkey を主 CTA として描画するサインイン画面。password + email での
 * サインインはトグルで開閉するフォーム(`PasswordSignInForm`)に格納し、視認性を落としている。
 * 縦の間隔は Payload の `.login-fields` が持つ gap に任せる。
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
    <div className="login-fields">
      <h1>Sign in</h1>

      {errorMessage != null && (
        <div aria-live="assertive" role="alert">
          <Banner type="error">{errorMessage}</Banner>
        </div>
      )}

      <PasskeySignInButton
        authClient={authClient}
        className={PASSKEY_BUTTON_CLASS}
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

      <Button buttonStyle="none" margin={false} onClick={onNavigateToRegister}>
        Create the first admin account
      </Button>
    </div>
  )
}
