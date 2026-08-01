import { Severity } from "../const/Severity/index.mjs"
import { NO_RESTRICTED_IMPORTS_PATHS } from "./constants/NO_RESTRICTED_IMPORTS_PATHS/index.mjs"

export const ESLINT = {
  rules: {
    complexity: [Severity.ERROR, 8],
    "no-restricted-imports": NO_RESTRICTED_IMPORTS_PATHS,
  },
}
