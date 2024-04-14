import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

const { SPACE08 } = Spaces

export const tagsStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACE08}rem;
  line-height: 2;
`
