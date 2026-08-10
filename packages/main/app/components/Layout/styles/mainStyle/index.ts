import { css } from "hono/css"

import { ScrollLockClass } from "@shared/const/ScrollLockClass"
import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import { ZIndexes } from "../../const/ZIndexes"

const { MEDIA_PC, MEDIA_SP } = MediaQueries

const HeaderSize = 81

export const mainStyle = css`
  overflow-y: auto;
  position: relative;

  &:has(.${ScrollLockClass}:checked) {
    overflow: hidden;
    z-index: ${ZIndexes.MAIN};
  }

  ${MEDIA_PC} {
    padding: ${Spaces.SPACE20}rem;
  }

  ${MEDIA_SP} {
    height: calc(100dvh - ${HeaderSize}px);
    padding-block: ${Spaces.SPACE20}rem;
  }
`
