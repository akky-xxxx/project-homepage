import { Severity } from "../const/Severity/index.mjs"
import { NO_RESTRICTED_IMPORTS_PATHS } from "./constants/NO_RESTRICTED_IMPORTS_PATHS/index.mjs"

export const ESLINT = [
  {
    rules: {
      complexity: [Severity.ERROR, 8],
      "no-restricted-imports": NO_RESTRICTED_IMPORTS_PATHS,
    },
  },
  {
    // it.each のテーブルや網羅的なケース列挙で自然に長くなるため
    files: ["**/*.test.ts*"],
    rules: {
      "max-lines-per-function": Severity.OFF,
    },
  },
]
