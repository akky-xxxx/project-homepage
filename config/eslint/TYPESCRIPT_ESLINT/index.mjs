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
  {
    // テストのフィクスチャ作成では意図的に型を絞り込むキャストが必要になるため
    files: ["**/*.test.ts*"],
    rules: {
      "@typescript-eslint/no-unsafe-type-assertion": 0,
    },
  },
]
