import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

const { SPACE08 } = Spaces

export const Heading3: FcWithChildren = (props) => {
  const { children } = props

  return <h3 class={rootStyle}>{children}</h3>
}

const rootStyle = css`
  border-left-style: solid;
  border-left-color: var(--primary-red);
  border-left-width: 1rem;
  padding-left: ${SPACE08}rem;
`
