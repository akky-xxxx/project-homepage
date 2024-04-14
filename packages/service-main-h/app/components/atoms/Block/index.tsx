import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

const { SPACE20 } = Spaces

export const Block: FcWithChildren = (props) => {
  const { children } = props

  return <div className={blockStyle}>{children}</div>
}

const blockStyle = css`
  margin-top: ${SPACE20}rem;
`
