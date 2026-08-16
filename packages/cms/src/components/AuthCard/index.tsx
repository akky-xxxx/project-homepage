"use client"

import type { JSX, ReactNode } from "react"

type AuthCardProps = {
  title: string
  children: ReactNode
}

/**
 * ログイン画面で使う、中央寄せのカード枠。
 * @param props タイトルと中身
 * @param props.children カードの中身
 * @param props.title カード見出し
 * @returns カード枠で囲んだコンテンツ
 */
export const AuthCard = ({ children, title }: AuthCardProps): JSX.Element => (
  <div
    style={{
      alignItems: "center",
      background: "var(--theme-bg)",
      display: "flex",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "var(--base)",
    }}
  >
    <div
      style={{
        background: "var(--theme-elevation-50)",
        borderRadius: "var(--style-radius-m)",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        padding: "calc(var(--base) * 2)",
        width: "100%",
      }}
    >
      <h1
        style={{
          color: "var(--theme-text)",
          fontSize: "var(--font-size-h3)",
          fontWeight: 600,
          margin: "0 0 calc(var(--base) * 1.5) 0",
          textAlign: "center",
        }}
      >
        {title}
      </h1>

      {children}
    </div>
  </div>
)
