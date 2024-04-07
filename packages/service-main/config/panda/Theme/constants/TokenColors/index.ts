import type { Tokens } from "@pandacss/dev"

export const TokenColors = {
  c3C3C3C: { value: "#3c3c3c" },
  cAA0000: { value: "#a00" },
  cFAFAFA: { value: "#fafafa" },
  cFF0000: { value: "#f00" },
} as const satisfies Tokens["colors"]
