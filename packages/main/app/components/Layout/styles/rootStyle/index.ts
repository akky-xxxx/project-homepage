import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"

const { MEDIA_PC } = MediaQueries

export const rootStyle = css`
  display: grid;

  ${MEDIA_PC} {
    grid-template-columns: 30rem 1fr;
    height: 100dvh;
  }
`
