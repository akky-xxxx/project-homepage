import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

const { SPACE32 } = Spaces

export const Section: FcWithChildren = (props) => {
  const { children } = props

  return <div className={blockStyle}>{children}</div>
}

const blockStyle = css`
  margin-top: ${SPACE32}rem;
`
