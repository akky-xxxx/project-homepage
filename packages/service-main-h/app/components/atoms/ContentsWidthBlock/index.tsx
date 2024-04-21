import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

const { SPACE12 } = Spaces
const { MEDIA_SP } = MediaQueries

export const ContentsWidthBlock: FcWithChildren = (props) => {
  const { children } = props

  return <div className={root}>{children}</div>
}

const root = css`
  ${MEDIA_SP} {
    padding-inline: ${SPACE12}rem;
  }
`
