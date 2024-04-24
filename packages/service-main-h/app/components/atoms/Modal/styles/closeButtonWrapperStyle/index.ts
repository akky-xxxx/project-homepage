import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import { ZIndexes } from "../../const/ZIndexes"

const { MEDIA_PC, MEDIA_SP } = MediaQueries
const { SPACE12 } = Spaces

export const closeButtonWrapperStyle = css`
  position: absolute;
  z-index: ${ZIndexes.CLOSE_BUTTON_WRAPPER};

  ${MEDIA_PC} {
    left: ${SPACE12}rem;
    top: ${SPACE12}rem;
  }

  ${MEDIA_SP} {
    bottom: ${SPACE12}rem;
    right: ${SPACE12}rem;
  }
`
