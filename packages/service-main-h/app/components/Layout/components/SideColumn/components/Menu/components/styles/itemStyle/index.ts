import { css } from "hono/css"

import { Colors } from "@shared/styles/Colors"
import { MediaQueries } from "@shared/styles/MediaQueries"
import { getLightDarkValue } from "@shared/utils/getLightDarkValue"

const { COLOR_FFE0E0, COLOR_663030 } = Colors
const { MEDIA_ONLY_HOVER } = MediaQueries

const hoveredBackground = getLightDarkValue({
  DARK: COLOR_663030,
  LIGHT: COLOR_FFE0E0,
})

export const itemStyle = css`
  border-top: 0.1rem solid var(--primary-color);
  display: block;
  padding: 2rem 1rem;
  transition: background-color 0.3s ease;

  ${MEDIA_ONLY_HOVER} {
    &:hover {
      background-color: ${hoveredBackground};
    }
  }
`
