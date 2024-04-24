import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import { ZIndexes } from "../../../../const/ZIndexes"

const { MEDIA_PC } = MediaQueries

export const rootStyle = css`
  background-color: var(--secondary-background);
  grid-column-start: 1;
  overflow-y: auto;
  padding-block: ${Spaces.SPACE20}rem;
  position: relative;
  transition: background-color 0.2s ease;
  z-index: ${ZIndexes.SIDE_COLUMN};

  ${MEDIA_PC} {
    height: 100dvh;
  }
`
