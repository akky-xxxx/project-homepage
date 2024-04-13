import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

const { MEDIA_PC } = MediaQueries

export const rootStyle = css`
  display: grid;

  ${MEDIA_PC} {
    gap: ${Spaces.SPACE20}rem;
    grid-template-columns: 30rem 1fr;
  }
`
