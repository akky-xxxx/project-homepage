import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import type { FC } from "hono/jsx"

const { MEDIA_SP } = MediaQueries
const { SPACE08 } = Spaces

export const Heading2Inner: FC = (props) => {
  const { children } = props

  return <div class={rootStyle}>{children}</div>
}

const rootStyle = css`
  align-items: center;
  column-gap: ${SPACE08}rem;
  display: flex;

  ${MEDIA_SP} {
    justify-content: space-between;
  }
`
