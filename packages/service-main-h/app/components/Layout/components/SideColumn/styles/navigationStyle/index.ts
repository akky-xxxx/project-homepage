import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import { MenuIconSize } from "../../const/MenuIconSize"
import { ZIndexes } from "../../const/ZIndexes"

const { SPACE12, SPACE20 } = Spaces
const { MEDIA_PC, MEDIA_SP } = MediaQueries

export const navigationStyle = css`
  ${MEDIA_PC} {
    margin-top: ${SPACE20}rem;
  }

  ${MEDIA_SP} {
    background-color: var(--primary-background);
    bottom: calc(${SPACE12 * 2}rem + ${MenuIconSize}px);
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2); /* TODO: 定数定義して置き換える */
    left: 0;
    overflow-y: auto;
    position: fixed;
    right: 0;
    top: 0;
    z-index: ${ZIndexes.NAVIGATION};

    label:has(:not(:checked)) + & {
      display: none;
    }

    label:has(:checked) + & {
      display: block;
    }
  }
`
