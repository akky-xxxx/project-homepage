import { SemanticTokenColors } from "./constants/SemanticTokenColors"
import { TokenColors } from "./constants/TokenColors"

import type { Config } from "@pandacss/dev"

export const Theme = {
  tokens: {
    colors: TokenColors,
  },

  semanticTokens: {
    colors: SemanticTokenColors,
  },
} as const satisfies Config["theme"]
