/* eslint-disable import/no-relative-packages */
import { Severity } from "../../../../../config/eslint/const/Severity/index.mjs"

export const IMPORT = [
  {
    // Payload のエントリは default export が規約
    files: ["src/payload.config.ts"],
    rules: {
      "import/no-default-export": Severity.OFF,
    },
  },
]
