"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const DISABLED_OPACITY = 0.7
const ENABLED_OPACITY = 1

/**
 * `@delmaredigital/payload-better-auth` の標準 LogoutButton は
 * `${adminRoute}/login` にリダイレクトするが、本プロジェクトは
 * routes.admin: '/' のため '//login' という不正な URL になってしまう。
 * そのため '/login' 固定でリダイレクトする版を用意している。
 * @returns ログアウトボタン
 */
export const LogoutButton = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      await Promise.allSettled([
        fetch("/api/auth/sign-out", {
          body: JSON.stringify({}),
          credentials: "include",
          // eslint-disable-next-line @typescript-eslint/naming-convention -- HTTP ヘッダ名
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }),
        fetch("/api/users/logout", {
          credentials: "include",
          method: "POST",
        }),
      ])
      router.push("/login")
    } catch (error) {
      // eslint-disable-next-line no-console -- ログアウト失敗はブラウザコンソールにのみ残す
      console.error("[better-auth] Logout error:", error)
      setIsLoading(false)
    }
  }

  return (
    <button
      className="nav__link"
      disabled={isLoading}
      type="button"
      style={{
        background: "none",
        border: "none",
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? DISABLED_OPACITY : ENABLED_OPACITY,
        padding: 0,
        textAlign: "left",
        width: "100%",
      }}
      onClick={() => void handleLogout()}
    >
      <span className="nav__link-label">{isLoading ? "Logging out..." : "Log out"}</span>
    </button>
  )
}
