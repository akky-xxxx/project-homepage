import { css } from "hono/css"

import type { FC } from "hono/jsx"

export const PaginationWrapper: FC = (props) => {
  const { children } = props

  return <div class={rootStyle}>{children}</div>
}

const rootStyle = css`
  display: flex;
  place-content: center;
`
