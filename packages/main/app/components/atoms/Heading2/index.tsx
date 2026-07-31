import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

const { MEDIA_PC, MEDIA_SP } = MediaQueries
const { SPACE04, SPACE08, SPACE12 } = Spaces

export const Heading2: FcWithChildren = (props) => {
  const { children } = props

  return <h2 class={rootStyle}>{children}</h2>
}

const rootStyle = css`
  border-bottom: 0.2rem solid var(--primary-red);

  ${MEDIA_PC} {
    padding-bottom: ${SPACE12}rem;
  }

  ${MEDIA_SP} {
    padding-bottom: ${SPACE04}rem;
    padding-inline: ${SPACE08}rem;
  }
`
