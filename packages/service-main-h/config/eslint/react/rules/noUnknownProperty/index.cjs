const { Severity } = require("../../../../../../../config/eslint/const/Severity/index.cjs")

exports.noUnknownProperty = [
  Severity.ERROR,
  {
    ignore: ["for", "class"],
  },
]
