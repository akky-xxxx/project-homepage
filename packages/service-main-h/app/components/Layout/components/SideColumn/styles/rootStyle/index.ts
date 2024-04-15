import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

const { MEDIA_PC } = MediaQueries

export const rootStyle = css`
  background-color: var(--secondary-background);
  grid-column-start: 1;
  overflow-y: auto;
  padding-block: ${Spaces.SPACE20}rem;
  transition: background-color 0.2s ease;

  ${MEDIA_PC} {
    height: 100vh;
  }
`
