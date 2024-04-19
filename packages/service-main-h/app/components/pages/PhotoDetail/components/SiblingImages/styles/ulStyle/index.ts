import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

const { SPACE20 } = Spaces

export const ulStyle = css`
  display: flex;
  gap: ${SPACE20}rem;
  justify-content: space-around;
  place-content: center;

  & li,
  & img {
    width: 100%;
  }
`
