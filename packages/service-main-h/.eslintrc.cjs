module.exports = {
  globals: {
    "bun:test": false,
  },
  extends: [
    "strict-check/react-max",
    "plugin:sonarjs/recommended",
    "../../config/eslint/import/index.cjs",
    "./config/eslint/import/index.cjs",
    "./config/eslint/strictCheck/index.cjs",
    "./config/eslint/react/index.cjs",
  ],

  ignorePatterns: ["**/dist/**"],
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  reportUnusedDisableDirectives: true,
  root: true,
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".mjs"],
      },
      typescript: [],
    },
  },
  rules: {
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: "either",
        depth: 25,
      },
    ],
  },
  overrides: [
    {
      files: "**/*.test.ts*",
      rules: {
        // FIXME: "bun:test" に対しての import/no-unresolved が解決できない
        "import/no-unresolved": 0,
      },
    },
  ],
}
