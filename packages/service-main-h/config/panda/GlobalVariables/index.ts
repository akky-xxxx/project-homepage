// eslint-disable-next-line import/no-extraneous-dependencies
import type { Config } from "@pandacss/dev"

export const GlobalVariables = {
  "--primary-background": "light-dark(#FAFAFA, #303030)",
  "--primary-color": "light-dark(#303030, #FAFAFA)",
  "--primary-red": "light-dark(#FF0000, #AA0000)",
  "--primary-shadow": "light-dark(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5))",

  "--secondary-background": "light-dark(#E0E0E0, #3C3C3C)",
} satisfies Config["globalVars"]
