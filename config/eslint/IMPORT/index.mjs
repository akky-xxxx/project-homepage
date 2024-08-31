import { Severity } from "../const/Severity/index.cjs"

export const IMPORT = [
  {
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          includeTypes: true,
        },
      ],
    },
  },
  {
    files: ["**/*.test.ts*"],
    rules: {
      // FIXME: "bun:test" に対しての import/no-unresolved が解決できない
      "import/no-unresolved": 0,
    },
  },
  {
    files: [
      "**/app/routes/**/index.tsx",
      "**/app/routes/**/_renderer.tsx",
      "**/app/server.ts",
      "**/app/islands/**/index.tsx",
    ],
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
]
