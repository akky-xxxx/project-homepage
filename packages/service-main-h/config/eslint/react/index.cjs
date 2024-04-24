const { noUnknownProperty } = require("./rules/noUnknownProperty/index.cjs")

module.exports = {
  rules: {
    "react/no-unknown-property": noUnknownProperty,
  },
}
