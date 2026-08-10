export const COMMON_JS = {
  files: ["**/*.cjs"],
  languageOptions: {
    globals: {
      __dirname: "readonly",
      __filename: "readonly",
      exports: "writable",
      module: "writable",
      require: "readonly",
    },
    sourceType: "commonjs",
  },
}
