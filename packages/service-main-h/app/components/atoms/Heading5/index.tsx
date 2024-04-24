import { css } from "hono/css"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

export const Heading5: FcWithChildren = (props) => {
  const { children } = props

  return <h5 class={rootStyle}>{children}</h5>
}

const rootStyle = css`
  font-size: 1.6rem;
  margin-block: 0;
`
