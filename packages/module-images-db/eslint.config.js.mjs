/* eslint-disable import/no-relative-packages */
import eslintConfigSCAll from "eslint-config-sc-all"
import eslintPluginSCJs from "eslint-plugin-sc-js"

import { COMMON_JS } from "../../config/eslint/COMMON_JS/index.mjs"
import { ESLINT_CONFIG_FILE } from "../../config/eslint/ESLINT_CONFIG_FILE/index.mjs"
import { IGNORES } from "../../config/eslint/IGNORES/index.mjs"

const config = [
  IGNORES,
  COMMON_JS,
  {
    files: [
      "**/*.{,m}js",
      "config/**/*.{,m}js",
    ],
  },
  {
    plugins: {
      "sc-js": eslintPluginSCJs,
    },
  },
  eslintConfigSCAll.getConfigs("javascript"),
  {
    rules: {
      "import/extensions": [
        2,
        {
          mjs: "require",
        },
      ],
      "import/no-extraneous-dependencies": 0,
      "import/no-unresolved": 0,
      "no-magic-numbers": 0,
      "sc-js/file-path-patterns": [
        2,
        {
          allowPatterns: [
            /index.m?js$/,
            /eslint\.config(?:\.js)?\.mjs/,
            /(?:commitlint|cspell|jest|prettier)\.config\.[cm]?[jt]s/,
          ],
        },
      ],
    },
  },
  {
    files: ["{eslint,next}.config.*"],
    rules: {
      "import/no-default-export": 0,
    },
  },
  ESLINT_CONFIG_FILE,
].flat()

export default config
