import { css } from "hono/css"

import { Colors } from "@shared/styles/Colors"
import { getLightDarkValue } from "@shared/utils/getLightDarkValue"

const {
  PRIMARY_BACKGROUND,
  PRIMARY_COLOR,
  PRIMARY_RED,
  SECONDARY_BACKGROUND,
  ACTIVE_COLOR,
  NEGATIVE_COLOR,
} = Colors

export const exteriorStyle = css`
  :root {
    --primary-background: ${getLightDarkValue(PRIMARY_BACKGROUND)};
    --primary-color: ${getLightDarkValue(PRIMARY_COLOR)};
    --primary-red: ${getLightDarkValue(PRIMARY_RED)};
    --primary-shadow: light-dark(rgb(0, 0, 0, 1), rgb(255, 255, 255, 1));

    --secondary-background: ${getLightDarkValue(SECONDARY_BACKGROUND)};

    --active-color: ${getLightDarkValue(ACTIVE_COLOR)};
    --negative-color: ${getLightDarkValue(NEGATIVE_COLOR)};

    @media (prefers-color-scheme: light) {
      color-scheme: light;
    }

    @media (prefers-color-scheme: dark) {
      color-scheme: dark;
    }
  }
`
