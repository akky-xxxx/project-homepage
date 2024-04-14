import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

const { MEDIA_PC, MEDIA_SP } = MediaQueries

export const mainStyle = css`
  overflow-y: scroll;

  ${MEDIA_PC} {
    padding: ${Spaces.SPACE20}rem;
  }

  ${MEDIA_SP} {
    padding-block: ${Spaces.SPACE20}rem;
  }
`
