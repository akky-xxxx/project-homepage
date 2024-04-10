const { forbiddenUseReactHooks } = require("./rules/forbiddenUseReactHooks/index.cjs")

module.exports = {
  rules: {
    "strict-check/forbidden-use-react-hooks": forbiddenUseReactHooks,
  },
}
