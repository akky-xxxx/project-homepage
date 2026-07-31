import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

const { SPACE08 } = Spaces

export const rootStyle = css`
  display: flex;
  align-items: center;
  column-gap: ${SPACE08}rem;
  fill: var(--primary-color);
`
