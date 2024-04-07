module.exports = {
  extends: [
    "strict-check/react-max",
    "plugin:sonarjs/recommended",
    "../../config/eslint/import/index.cjs",
    "../../config/eslint/strictCheck/index.cjs",
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
}
