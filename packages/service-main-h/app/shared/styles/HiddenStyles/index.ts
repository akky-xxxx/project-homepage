import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"

const { MEDIA_SP, MEDIA_PC } = MediaQueries

export const HiddenStyles = {
  HIDDEN_PC: css`
    ${MEDIA_PC} {
      display: none;
    }
  `,
  HIDDEN_SP: css`
    ${MEDIA_SP} {
      display: none;
    }
  `,
} as const
