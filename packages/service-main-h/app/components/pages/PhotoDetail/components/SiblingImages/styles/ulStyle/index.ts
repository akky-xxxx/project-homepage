import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

const { SPACE20 } = Spaces

export const ulStyle = css`
  display: flex;
  gap: ${SPACE20}rem;
  justify-content: space-between;

  & li {
    max-width: 50%;
  }

  & img {
    max-width: 100%;
  }
`
