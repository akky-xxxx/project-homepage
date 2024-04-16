import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

const { SPACE04 } = Spaces

export const dlStyle = css`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: ${SPACE04}rem;
`
