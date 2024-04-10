const { Severity } = require("../../../../../config/eslint/const/Severity/index.cjs")

module.exports = {
  overrides: [
    {
      files: ["**/app/**/{page,layout}.tsx"],
      rules: Object.fromEntries(
        ["import/no-default-export"].map((ruleName) => [ruleName, Severity.OFF]),
      ),
    },
    {
      files: [
        "**/app/**/_renderer.tsx",
        "**/app/server.ts",
        "**/islands/**/index.tsx",
        "**/routes/**/index.tsx",
      ],
      rules: {
        "import/no-default-export": [Severity.OFF],
      },
    },
  ],
}
