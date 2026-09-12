/* eslint-disable import/no-relative-packages */
import eslintConfigPrettier from "eslint-config-prettier/flat"
import eslintConfigSCAll from "eslint-config-sc-all"
import eslintPluginJsdoc from "eslint-plugin-jsdoc"
import eslintPluginSonarjs from "eslint-plugin-sonarjs"

import { ESLINT } from "../../config/eslint/ESLINT/index.mjs"
import { IGNORES } from "../../config/eslint/IGNORES/index.mjs"
import { IMPORT } from "../../config/eslint/IMPORT/index.mjs"
import { JSDOC } from "../../config/eslint/JSDOC/index.mjs"
import { PLUGIN_SC_JS } from "../../config/eslint/PLUGIN_SC_JS/index.mjs"
import { SONARJS } from "../../config/eslint/SONARJS/index.mjs"
import { TYPESCRIPT_ESLINT } from "../../config/eslint/TYPESCRIPT_ESLINT/index.mjs"

/** @type {import("typescript-eslint").Config} */
const config = [
  IGNORES,

  eslintPluginJsdoc.configs["flat/recommended-typescript"],
  eslintPluginSonarjs.configs.recommended,
  eslintConfigSCAll.getConfigs("typescript", ["react", "jest"]),

  ESLINT,
  PLUGIN_SC_JS,
  TYPESCRIPT_ESLINT,
  IMPORT,
  SONARJS,
  JSDOC,

  {
    // eslint-plugin-jest の一部ルール(jest/no-deprecated-functions 等)は Jest のバージョンを
    // 自動検出しようとし、実際に jest パッケージが解決できないと初期化時に例外を投げる。
    // このリポジトリは bun:test を使っており jest 自体を依存に持たないため、明示的に指定する
    settings: {
      jest: {
        version: 29,
      },
    },
  },
  {
    rules: {
      // CMS_API_KEY を含む apiClient/ENVIRONMENT が client(island・client.ts)側の
      // import グラフへ混入することの早期検知。ただし import.meta.env.CMS_API_KEY への
      // 直接参照や中継モジュール経由の推移的な import までは検知できないため、実際の保証は
      // package.json の check:client-bundle-secrets(ビルド成果物の検査)側で行う
      "import/no-restricted-paths": [
        2,
        {
          zones: [
            {
              from: [
                "./app/shared/utils/apiClient/**",
                "./app/shared/const/ENVIRONMENT/**",
                "./app/shared/schemas/EnvironmentSchema/**",
              ],
              target: ["./app/islands/**", "./app/client.ts"],
            },
          ],
        },
      ],
      "react/no-unknown-property": [
        2,
        {
          ignore: ["class", "for"],
        },
      ],
    },
  },
  eslintConfigPrettier,
].flat()

export default config
