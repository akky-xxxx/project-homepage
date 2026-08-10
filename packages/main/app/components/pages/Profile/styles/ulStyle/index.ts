import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

const { SPACE20 } = Spaces

export const ulStyle = css`
  padding-left: ${SPACE20}rem;

  li {
    list-style: initial;
  }
`
