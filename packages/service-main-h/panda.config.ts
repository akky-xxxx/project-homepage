// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "@pandacss/dev"

import { Conditions } from "./config/panda/Conditions"
import { GlobalCss } from "./config/panda/GlobalCss"
import { GlobalVariables } from "./config/panda/GlobalVariables"
import { Theme } from "./config/panda/Theme"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  conditions: Conditions,
  exclude: [],
  globalCss: GlobalCss,
  globalVars: GlobalVariables,
  include: ["./app/**/*.{js,jsx,ts,tsx}"],
  outdir: "app/libs/styled-system",
  preflight: false,
  theme: Theme,
})
