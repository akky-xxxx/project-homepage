const { Severity } = require("../const/Severity/index.cjs")

module.exports = {
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      "typescript-bun": {
        project: true,
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        includeTypes: true,
      },
    ],
  },
  overrides: [
    {
      files: ["**/app/**/{page,layout}.tsx"],
      rules: Object.fromEntries(
        ["import/no-default-export"].map((ruleName) => [ruleName, Severity.OFF]),
      ),
    },
    {
      files: ["**/app/**/layout.tsx"],
      rules: {
        "import/extensions": [
          Severity.ERROR,
          {
            css: "always",
          },
        ],
      },
    },
  ],
}
