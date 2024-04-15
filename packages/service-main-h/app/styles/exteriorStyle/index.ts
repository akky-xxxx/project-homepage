import { css } from "hono/css"

import { ColorSchemaName } from "@shared/const/ColorSchemaName"
import { Colors } from "@shared/styles/Colors"
import { getLightDarkValue } from "@shared/utils/getLightDarkValue"

const { PRIMARY_BACKGROUND, PRIMARY_COLOR, PRIMARY_RED, SECONDARY_BACKGROUND } = Colors

export const exteriorStyle = css`
  :root {
    --primary-background: ${getLightDarkValue(PRIMARY_BACKGROUND)};
    --primary-color: ${getLightDarkValue(PRIMARY_COLOR)};
    --primary-red: ${getLightDarkValue(PRIMARY_RED)};

    --secondary-background: ${getLightDarkValue(SECONDARY_BACKGROUND)};

    &:has(input[name="${ColorSchemaName}"]:not(:checked)) {
      color-scheme: light;
    }

    &:has(input[name="${ColorSchemaName}"]:checked) {
      color-scheme: dark;
    }
  }
`
