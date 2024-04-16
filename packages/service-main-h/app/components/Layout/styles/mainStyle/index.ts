import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

const { MEDIA_PC, MEDIA_SP } = MediaQueries

const HeaderSize = 81

export const mainStyle = css`
  overflow-y: auto;

  ${MEDIA_PC} {
    padding: ${Spaces.SPACE20}rem;
  }

  ${MEDIA_SP} {
    height: calc(100vh - ${HeaderSize}px);
    padding-block: ${Spaces.SPACE20}rem;
  }
`
