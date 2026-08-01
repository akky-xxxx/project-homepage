import { Severity } from "../const/Severity/index.mjs"

// eslint-plugin-jsdoc の実装を eslint-plugin-import が解析できず、
// 常に "Parse errors in imported module" として誤検知するため
export const ESLINT_CONFIG_FILE = {
  files: ["**/eslint.config.mjs"],
  rules: Object.fromEntries(
    [
      "import/no-deprecated",
      "import/no-named-as-default",
      "import/no-named-as-default-member",
    ].map((ruleName) => [ruleName, Severity.OFF]),
  ),
}
