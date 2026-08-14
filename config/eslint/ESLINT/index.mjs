import { Severity } from "../const/Severity/index.mjs"

export const ESLINT = [
  {
    rules: {
      complexity: [Severity.ERROR, 8],
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
