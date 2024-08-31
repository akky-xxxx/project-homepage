export const JSDOC = [
  {
    rules: {
      "jsdoc/require-jsdoc": 0,
    },
  },
  {
    files: ["src/shared/**/*.ts{,x}"],
    rules: {
      "jsdoc/require-jsdoc": 2,
    },
  },
]
