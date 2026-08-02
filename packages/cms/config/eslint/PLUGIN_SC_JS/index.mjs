/* eslint-disable import/no-relative-packages */
import eslintPluginSCJs from "eslint-plugin-sc-js"

import { FILE_PATH_PATTERNS } from "./constants/FILE_PATH_PATTERNS/index.mjs"
import { INDIVIDUAL_IMPORT } from "../../../../../config/eslint/PLUGIN_SC_JS/constants/INDIVIDUAL_IMPORT/index.mjs"

export const PLUGIN_SC_JS = [
  {
    plugins: {
      "sc-js": eslintPluginSCJs,
    },
  },
  {
    rules: {
      "sc-js/file-path-patterns": FILE_PATH_PATTERNS,
      "sc-js/forbidden-multiple-named-exports": 2,
      "sc-js/individual-import": INDIVIDUAL_IMPORT,
      "sc-js/restrict-use-of-process-env": 2,
    },
  },
]
