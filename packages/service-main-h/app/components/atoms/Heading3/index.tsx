import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

const { MEDIA_PC, MEDIA_SP } = MediaQueries
const { SPACE04, SPACE08 } = Spaces

export const Heading3: FcWithChildren = (props) => {
  const { children } = props

  return <h3 className={rootStyle}>{children}</h3>
}

const rootStyle = css`
  border-left-style: solid;
  border-left-color: var(--primary-red);

  ${MEDIA_PC} {
    border-left-width: 1rem;
    padding-left: ${SPACE08}rem;
  }

  ${MEDIA_SP} {
    border-left-width: 0.5rem;
    padding-left: ${SPACE04}rem;
  }
`
