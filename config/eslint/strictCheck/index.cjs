const { forbiddenUseReactHooks } = require("./rules/forbiddenUseReactHooks/index.cjs")
const { matchNamesOfFileAndExport } = require("./rules/matchNamesOfFileAndExport/index.cjs")
const { Severity } = require("../const/Severity/index.cjs")

module.exports = {
  plugins: ["strict-check"],
  rules: {
    "strict-check/forbidden-multiple-named-exports": [Severity.ERROR],
    "strict-check/forbidden-use-react-hooks": forbiddenUseReactHooks,
    "strict-check/match-names-of-file-and-export": matchNamesOfFileAndExport,
  },
  overrides: [
    {
      files: "{index,View}.stories.tsx",
      rules: {
        "strict-check/forbidden-multiple-named-exports": Severity.OFF,
      },
    },
    {
      files: ["{index,View}.(stories|test).{ts,tsx}", "**/{layout|page}.tsx", "**/View.tsx"],
      rules: {
        "strict-check/match-names-of-file-and-export": Severity.OFF,
      },
    },
  ],
}
