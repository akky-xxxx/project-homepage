module.exports = {
  globals: {
    bun: false,
  },
  extends: [
    "strict-check/typescript-max",
    "plugin:sonarjs/recommended-legacy",
    "../../config/eslint/import/index.cjs",
    "../../config/eslint/strictCheck/index.cjs",
  ],

  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  reportUnusedDisableDirectives: true,
  root: true,
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".json", ".ts"],
      },
      typescript: [],
    },
  },
  overrides: [
    {
      files: ["src/const/Images/index.ts", "src/types/Tag/index.ts"],
      rules: {
        "max-lines": "off",
      },
    },
  ],
}
