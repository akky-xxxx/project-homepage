const { Severity } = require("../../../../../../../config/eslint/const/Severity/index.cjs")

exports.forbiddenUseReactHooks = [
  Severity.ERROR,
  {
    allowPatterns: [
      /\/islands\/[^/]+\/index.tsx$/,
      /\/modules\/use[A-Z][^/]+\/index(?:.test)?.ts$/,
    ],
  },
]
