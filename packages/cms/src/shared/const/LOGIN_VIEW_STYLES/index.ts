import type { CSSProperties } from "react"

/**
 * `LoginView` が自前描画する部分(カード・トグルボタン・入力欄・ラベル・エラーバナー・成功バナー等)の
 * スタイルトークン。passkey ボタンと TOTP 検証画面はベンダー標準コンポーネントを使うため対象外。
 * 色・間隔は `main` パッケージ独自のトークン体系ではなく、Payload 標準の CSS 変数を使う。
 */
export const LOGIN_VIEW_STYLES: Record<string, CSSProperties> = {
  card: {
    background: "var(--theme-elevation-50)",
    borderRadius: "var(--style-radius-m)",
    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    padding: "calc(var(--base) * 2)",
    width: "100%",
  },

  errorBanner: {
    background: "var(--theme-error-50)",
    border: "1px solid var(--theme-error-200)",
    borderRadius: "var(--style-radius-s)",
    color: "var(--theme-error-500)",
    fontSize: "var(--font-size-small)",
    marginBottom: "var(--base)",
    padding: "calc(var(--base) * 0.5)",
  },

  input: {
    background: "var(--theme-input-bg)",
    border: "1px solid var(--theme-elevation-150)",
    borderRadius: "var(--style-radius-s)",
    boxSizing: "border-box",
    color: "var(--theme-text)",
    fontSize: "var(--font-size-base)",
    outline: "none",
    padding: "calc(var(--base) * 0.75)",
    width: "100%",
  },

  label: {
    color: "var(--theme-text)",
    display: "block",
    fontSize: "var(--font-size-small)",
    fontWeight: 500,
    marginBottom: "calc(var(--base) * 0.5)",
  },

  link: {
    background: "none",
    border: "none",
    color: "var(--theme-text)",
    cursor: "pointer",
    fontSize: "var(--font-size-small)",
    opacity: 0.7,
    padding: 0,
    textDecoration: "underline",
  },

  page: {
    alignItems: "center",
    background: "var(--theme-bg)",
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "var(--base)",
  },

  submitButton: {
    background: "var(--theme-elevation-800)",
    border: "none",
    borderRadius: "var(--style-radius-s)",
    color: "var(--theme-elevation-50)",
    cursor: "pointer",
    fontSize: "var(--font-size-base)",
    fontWeight: 500,
    padding: "calc(var(--base) * 0.75)",
    width: "100%",
  },

  successBanner: {
    background: "var(--theme-success-50)",
    border: "1px solid var(--theme-success-200)",
    borderRadius: "var(--style-radius-s)",
    color: "var(--theme-success-500)",
    fontSize: "var(--font-size-small)",
    marginBottom: "var(--base)",
    padding: "calc(var(--base) * 0.5)",
  },

  toggleButton: {
    background: "var(--theme-elevation-100)",
    border: "1px solid var(--theme-elevation-150)",
    borderRadius: "var(--style-radius-s)",
    color: "var(--theme-text)",
    cursor: "pointer",
    fontSize: "var(--font-size-small)",
    padding: "calc(var(--base) * 0.75)",
    width: "100%",
  },
}
