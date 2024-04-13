import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

const { MEDIA_PC, MEDIA_SP } = MediaQueries

export const mainStyle = css`
  ${MEDIA_PC} {
    padding-block: ${Spaces.SPACE20}rem;
  }

  ${MEDIA_SP} {
    padding: ${Spaces.SPACE20}rem;
  }
`