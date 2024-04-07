import type { SemanticTokens } from "@pandacss/dev"

export const SemanticTokenColors = {
  backgroundColor: {
    DEFAULT: {
      value: {
        _dark: "{colors.c3C3C3C}",
        _light: "{colors.cFAFAFA}",
      },
    },
  },
  color: {
    DEFAULT: {
      value: {
        _dark: "{colors.cFAFAFA}",
        _light: "{colors.c3C3C3C}",
      },
    },
    RED: {
      value: {
        _dark: "{colors.cAA0000}",
        _light: "{colors.cFF0000}",
      },
    },
  },
} as const satisfies SemanticTokens["colors"]
