const { Severity } = require("../const/Severity/index.cjs")

module.exports = {
  overrides: [
    {
      files: "*.test.{ts,tsx}",
      rules: {
        "sonarjs/no-duplicate-string": Severity.OFF,
      },
    },
  ],
}
