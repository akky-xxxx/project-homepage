/* eslint-disable import/no-relative-packages */
import typescriptEslintParser from "@typescript-eslint/parser"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import eslintConfigSCAll from "eslint-config-sc-all"
import eslintPluginSCJs from "eslint-plugin-sc-js"

import { IGNORES as CMS_IGNORES } from "./config/eslint/IGNORES/index.mjs"
import { COMMON_JS } from "../../config/eslint/COMMON_JS/index.mjs"
import { ESLINT_CONFIG_FILE } from "../../config/eslint/ESLINT_CONFIG_FILE/index.mjs"
import { IGNORES } from "../../config/eslint/IGNORES/index.mjs"

const config = [
  IGNORES,
  CMS_IGNORES,
  COMMON_JS,
  {
    files: [
      "**/*.{,m}js",
      "config/**/*.{,m}js",
      "next.config.ts",
      "playwright.config.ts",
      "vitest.config.mts",
      "vitest.setup.ts",
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
            /index\.[cm]?js$/,
            /eslint\.config(?:\.js)?\.mjs/,
            /(?:commitlint|cspell|next|playwright|prettier|vitest)\.config\.[cm]?[jt]s/,
            /vitest\.setup\.ts/,
          ],
        },
      ],
    },
  },
  {
    files: ["{eslint,next,playwright,vitest}.config.*", "vitest.setup.ts"],
    rules: {
      "import/no-default-export": 0,
    },
  },
  {
    // TypeScript で書かれた設定ファイル。tsconfig の対象外もあるため
    // 型情報を使わないパースのみ行う
    files: ["next.config.ts", "playwright.config.ts", "vitest.config.mts", "vitest.setup.ts"],
    languageOptions: {
      globals: {
        process: "readonly",
      },
      parser: typescriptEslintParser,
    },
  },
  {
    // eslint-plugin-import が @vitejs/plugin-react を解析できず、
    // "Parse errors in imported module" として誤検知するため
    files: ["vitest.config.mts"],
    rules: {
      "import/no-deprecated": 0,
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0,
    },
  },
  ESLINT_CONFIG_FILE,
  eslintConfigPrettier,
].flat()

export default config
