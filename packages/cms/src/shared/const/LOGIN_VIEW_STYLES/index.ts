import type { CSSProperties } from "react"

export const LOGIN_VIEW_STYLES: Record<string, CSSProperties> = {
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

  linkButton: {
    background: "none",
    border: "none",
    color: "var(--theme-text)",
    cursor: "pointer",
    display: "block",
    fontSize: "var(--font-size-small)",
    margin: "var(--base) auto 0",
    opacity: 0.7,
    textAlign: "center",
    textDecoration: "underline",
  },

  primaryButton: {
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

  secondaryButton: {
    background: "transparent",
    border: "1px solid var(--theme-elevation-150)",
    borderRadius: "var(--style-radius-s)",
    color: "var(--theme-text)",
    cursor: "pointer",
    fontSize: "var(--font-size-small)",
    marginTop: "var(--base)",
    padding: "calc(var(--base) * 0.75)",
    width: "100%",
  },
}
