import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

const { MEDIA_SP } = MediaQueries
const { SPACE12 } = Spaces

export const Heading2: FcWithChildren = (props) => {
  const { children } = props

  return <h2 className={rootStyle}>{children}</h2>
}

const rootStyle = css`
  padding-bottom: ${SPACE12}rem;
  border-bottom: 1px solid var(--primary-color);

  ${MEDIA_SP} {
    padding-inline: ${SPACE12}rem;
  }
`
