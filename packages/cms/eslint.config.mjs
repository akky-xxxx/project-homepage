/* eslint-disable import/no-relative-packages */
import eslintConfigPrettier from "eslint-config-prettier/flat"
import eslintConfigSCAll from "eslint-config-sc-all"
import eslintPluginJsdoc from "eslint-plugin-jsdoc"
import eslintPluginSonarjs from "eslint-plugin-sonarjs"

import { IGNORES as CMS_IGNORES } from "./config/eslint/IGNORES/index.mjs"
import { PAYLOAD_CONFIG } from "./config/eslint/PAYLOAD_CONFIG/index.mjs"
import { PLUGIN_SC_JS } from "./config/eslint/PLUGIN_SC_JS/index.mjs"
import { TESTS } from "./config/eslint/TESTS/index.mjs"
import { ESLINT } from "../../config/eslint/ESLINT/index.mjs"
import { IGNORES } from "../../config/eslint/IGNORES/index.mjs"
import { JSDOC } from "../../config/eslint/JSDOC/index.mjs"
import { SONARJS } from "../../config/eslint/SONARJS/index.mjs"
import { TYPESCRIPT_ESLINT } from "../../config/eslint/TYPESCRIPT_ESLINT/index.mjs"

/** @type {import("typescript-eslint").Config} */
const config = [
  IGNORES,
  CMS_IGNORES,

  eslintPluginJsdoc.configs["flat/recommended-typescript"],
  eslintPluginSonarjs.configs.recommended,
  eslintConfigSCAll.getConfigs("typescript", ["next", "react"]),

  ESLINT,
  PLUGIN_SC_JS,
  TYPESCRIPT_ESLINT,
  PAYLOAD_CONFIG,
  SONARJS,
  JSDOC,
  TESTS,

  eslintConfigPrettier,
].flat()

export default config
