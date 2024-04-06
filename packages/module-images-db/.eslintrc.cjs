module.exports = {
  globals: {
    bun: false,
  },
  extends: [
    "strict-check/typescript-max",
    "plugin:sonarjs/recommended",
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
}
