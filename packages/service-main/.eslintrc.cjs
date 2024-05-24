module.exports = {
  extends: [
    "strict-check/react-max",
    "plugin:sonarjs/recommended-legacy",
    "../../config/eslint/import/index.cjs",
    "../../config/eslint/strictCheck/index.cjs",
    "../../config/eslint/strictDependencies/index.cjs",
  ],

  ignorePatterns: ["**/.next/**", "**/styled-system/**", "**/libs/**"],
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
      files: "src/app/**/page.tsx",
      rules: {
        // no-restricted-exports と競合するため
        "unicorn/prefer-export-from": 0,
      },
    },
  ],
}
