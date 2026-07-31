'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

/**
 * @delmaredigital/payload-better-auth の標準 LogoutButton は
 * `${adminRoute}/login` にリダイレクトするが、本プロジェクトは
 * routes.admin: '/' のため '//login' という不正な URL になってしまう。
 * そのため '/login' 固定でリダイレクトする版を用意している。
 */
export function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogout() {
    if (isLoading) return
    setIsLoading(true)

    try {
      await Promise.allSettled([
        fetch('/api/auth/sign-out', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        }),
        fetch('/api/users/logout', {
          method: 'POST',
          credentials: 'include',
        }),
      ])
      router.push('/login')
    } catch (error) {
      console.error('[better-auth] Logout error:', error)
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      type="button"
      className="nav__link"
      style={{
        background: 'none',
        border: 'none',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
        width: '100%',
        textAlign: 'left',
        padding: 0,
      }}
    >
      <span className="nav__link-label">{isLoading ? 'Logging out...' : 'Log out'}</span>
    </button>
  )
}
