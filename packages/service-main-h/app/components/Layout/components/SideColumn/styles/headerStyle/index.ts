import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

const { SPACE12 } = Spaces
const { MEDIA_PC, MEDIA_SP } = MediaQueries

export const headerStyle = css`
  column-gap: ${SPACE12}rem;
  display: flex;

  ${MEDIA_PC} {
    justify-content: center;
  }

  ${MEDIA_SP} {
    justify-content: space-between;
    padding-inline: ${SPACE12}rem;
  }
`
