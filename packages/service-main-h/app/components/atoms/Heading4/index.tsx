import { css } from "hono/css"

import type { FcWithChildren } from "@shared/types/FcWithChildren"

export const Heading4: FcWithChildren = (props) => {
  const { children } = props

  return <h4 className={rootStyle}>{children}</h4>
}

const rootStyle = css`
  color: var(--primary-red);
`
