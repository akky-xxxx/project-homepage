import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"
import { ThumbnailWidth } from "@shared/styles/ThumbnailWidth"

const { SPACE20 } = Spaces

export const ulStyle = css`
  display: grid;
  gap: ${SPACE20}rem;
  grid-template-columns: repeat(auto-fit, ${ThumbnailWidth}rem);
  place-content: center;
`
