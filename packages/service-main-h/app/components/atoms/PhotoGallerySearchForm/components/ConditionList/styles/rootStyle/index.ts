import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

const { SPACE12 } = Spaces

export const rootStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACE12}rem;
`
