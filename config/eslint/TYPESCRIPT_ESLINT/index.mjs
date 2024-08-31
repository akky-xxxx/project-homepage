export const TYPESCRIPT_ESLINT = [
  {
    rules: {
      "@typescript-eslint/no-unused-vars": 0, // check by tsc
    },
  },
  {
    files: ["**/*.stories.tsx"],
    rules: {
      "@typescript-eslint/naming-convention": 0,
    },
  },
]
