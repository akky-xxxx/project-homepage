import { defineConfig } from "@pandacss/dev"

import { Theme } from "./config/panda/Theme"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: Theme,

  // The output directory for your css system
  outdir: "styled-system",

  conditions: {
    dark: ".is-dark &",
    light: ".is-light &",
  },
})
