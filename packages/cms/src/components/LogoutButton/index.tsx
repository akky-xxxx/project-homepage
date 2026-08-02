"use client"

import { useRouter } from "next/navigation"
import { Fragment, useState } from "react"

const DISABLED_OPACITY = 0.7
const ENABLED_OPACITY = 1

/**
 * Better Auth と Payload の両方のセッションを破棄する。
 * allSettled は reject しないため、失効が実際に成立したかは個々のレスポンスで判定する。
 * @returns 両方のログアウトが成功していれば true
 */
const signOut = async (): Promise<boolean> => {
  const results = await Promise.allSettled([
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

  const isSignedOut = results.every((result) => result.status === "fulfilled" && result.value.ok)
  if (!isSignedOut) {
    // eslint-disable-next-line no-console -- ログアウト失敗はブラウザコンソールにのみ残す
    console.error("[better-auth] Logout failed:", results)
  }

  return isSignedOut
}

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
  const [hasFailed, setHasFailed] = useState(false)

  const handleLogout = async () => {
    if (isLoading) return
    setIsLoading(true)
    setHasFailed(false)

    if (!(await signOut())) {
      setHasFailed(true)
      setIsLoading(false)
      return
    }

    router.push("/login")
  }

  return (
    <Fragment>
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

      {hasFailed ? (
        <span role="alert" style={{ display: "block" }}>
          Logout failed. Please retry.
        </span>
      ) : null}
    </Fragment>
  )
}
