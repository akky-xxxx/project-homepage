// eslint-disable-next-line import/no-extraneous-dependencies
import type { Tokens } from "@pandacss/dev"

export const ColorToken = {
  c3C3C3C: { value: "#3C3C3C" },
  c303030: { value: "#303030" },
  c663030: { value: "#663030" },
  cAA0000: { value: "#AA0000" },
  cE0E0E0: { value: "#E0E0E0" },
  cFAFAFA: { value: "#FAFAFA" },
  cFF0000: { value: "#FF0000" },
  cFFE0E0: { value: "#FFE0E0" },
} as const satisfies Tokens["colors"]
