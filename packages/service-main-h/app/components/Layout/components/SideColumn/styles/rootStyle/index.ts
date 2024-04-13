import { css } from "hono/css"

import { Colors } from "@shared/styles/Colors"
import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"
import { getLightDarkValue } from "@shared/utils/getLightDarkValue"

const { COLOR_3C3C3C, COLOR_E0E0E0 } = Colors
const { MEDIA_PC } = MediaQueries

const backgroundColor = getLightDarkValue({
  DARK: COLOR_3C3C3C,
  LIGHT: COLOR_E0E0E0,
})

export const rootStyle = css`
  background-color: ${backgroundColor};
  grid-column-start: 1;
  overflow-y: auto;
  padding-block: ${Spaces.SPACE20}rem;
  transition: background-color 0.2s ease;

  ${MEDIA_PC} {
    height: 100vh;
  }
`
