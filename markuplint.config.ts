import type { Config } from "@markuplint/ml-config"

const config: Config = {
  extends: "markuplint:recommended-react",
  parser: {
    "\\.[jt]sx?$": "@markuplint/jsx-parser",
  },
  specs: {
    ".[jt]sx?$": "@markuplint/react-spec",
  },
  excludeFiles: ["**/*.stories.tsx"],
}

export default config
