import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

const { SPACE12, SPACE32 } = Spaces
const { MEDIA_SP } = MediaQueries

export const Section: FcWithChildren = (props) => {
  const { children } = props

  return <section class={blockStyle}>{children}</section>
}

const blockStyle = css`
  margin-top: ${SPACE32}rem;

  ${MEDIA_SP} {
    padding-inline: ${SPACE12}rem;
  }
`
