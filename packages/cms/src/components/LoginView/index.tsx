"use client"

import { TwoFactorVerifyView } from "@delmaredigital/payload-better-auth/components"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { authClient } from "@/shared/utilities/authClient"

import { RegisterView } from "./components/RegisterView"
import { SignInView } from "./components/SignInView"

// routes.admin: "/" (payload.config.ts) 固定のため、LogoutButton と同様にハードコードする
const ADMIN_PATH = "/"

type Mode = "register" | "signIn" | "twoFactor"

/**
 * ログイン済みかどうかを判定し、済みなら管理画面へ即座に戻す。
 * ローディング中は簡易表示に留め、標準コンポーネントが持つ `requiredRole` 相当の
 * ロール判定は複製しない(実際のアクセス制御は Users コレクションの access が担う)。
 * @returns セッション確認が完了したら true
 */
const useRedirectIfAlreadySignedIn = (): boolean => {
  const router = useRouter()
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const isCancelledRef = useRef(false)

  useEffect(() => {
    isCancelledRef.current = false

    void (async () => {
      const { data } = await authClient.getSession()
      if (isCancelledRef.current) return

      if (data?.user != null) {
        router.replace(ADMIN_PATH)
        return
      }

      setIsCheckingSession(false)
    })()

    return () => {
      isCancelledRef.current = true
    }
  }, [router])

  return isCheckingSession
}

/**
 * passkey 主・password + TOTP フォールバックのログイン画面。
 * `@delmaredigital/payload-better-auth` の標準 `LoginView` は password を主要フォームとして
 * 描画するため、そのまま流用できず自前実装している(passkey ボタン・TOTP 検証画面は
 * ベンダー標準コンポーネントをそのまま使う)。
 *
 * 全画面の中央寄せと最大幅は Payload の `MinimalTemplate` が担うため、ここでは持たない。
 * 組み込み login view を `loginViewComponent` で上書きした場合も、Payload は組み込み view の
 * テンプレート設定を引き継いで `MinimalTemplate` でラップする
 * (`@payloadcms/next` の `dist/views/Root/getRouteData.js`)。
 * @returns ログイン画面
 */
export const LoginView = () => {
  const isCheckingSession = useRedirectIfAlreadySignedIn()
  const [mode, setMode] = useState<Mode>("signIn")

  if (isCheckingSession) return <p>Loading...</p>

  if (mode === "twoFactor") return <TwoFactorVerifyView />

  if (mode === "register") {
    return (
      <RegisterView
        onNavigateToSignIn={() => {
          setMode("signIn")
        }}
      />
    )
  }

  return (
    <SignInView
      onNavigateToRegister={() => {
        setMode("register")
      }}
      onRequireTwoFactor={() => {
        setMode("twoFactor")
      }}
    />
  )
}
