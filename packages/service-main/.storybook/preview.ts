import "../src/app/globals.css"
import { initialize, mswLoader } from "msw-storybook-addon"
import { themes } from "@storybook/theming"

import type { Preview } from "@storybook/react"

initialize()

const preview = {
  parameters: {
    actions: { argTypesRegex: "^(?:on|handle)[A-Z].*" },
    backgrounds: {
      values: [
        {
          name: "default",
          value: "transparent",
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.light },

      current: "light",

      darkClass: ["is-dark"],
      lightClass: ["is-light"],
      classTarget: "html",
      stylePreview: true,
    },
    layout: "fullscreen",
  },
  loaders: [mswLoader],
} satisfies Preview

export default preview
