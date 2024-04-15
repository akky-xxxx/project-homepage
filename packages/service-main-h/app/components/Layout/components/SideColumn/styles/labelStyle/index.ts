import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import { MenuIconSize } from "../../const/MenuIconSize"
import { ZIndexes } from "../../const/ZIndexes"

const { MEDIA_PC, MEDIA_SP } = MediaQueries
const { SPACE12 } = Spaces

export const labelStyle = css`
  ${MEDIA_PC} {
    display: none;
  }

  ${MEDIA_SP} {
    background-color: var(--secondary-background);
    border-radius: 4px;
    bottom: ${SPACE12}rem;
    display: grid;
    height: ${MenuIconSize}px;
    place-content: center;
    position: fixed;
    right: ${SPACE12}rem;
    width: ${MenuIconSize}px;
    z-index: ${ZIndexes.LABEL};

    & > input {
      display: none;
    }
  }
`
