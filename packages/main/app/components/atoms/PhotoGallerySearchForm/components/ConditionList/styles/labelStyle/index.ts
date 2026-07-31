import { css } from "hono/css"

import { Colors } from "@shared/styles/Colors"
import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

const { COLOR_FAFAFA } = Colors
const { MEDIA_ONLY_HOVER } = MediaQueries
const { SPACE04, SPACE12 } = Spaces

export const labelStyle = css`
  border-radius: 9999px;
  border: 1px solid var(--primary-color);
  column-gap: ${SPACE04}rem;
  cursor: pointer;
  display: flex;
  padding: ${SPACE04}rem ${SPACE12}rem;

  ${MEDIA_ONLY_HOVER} {
    &:hover {
      opacity: 0.5;
    }
  }

  &:has(input:checked) {
    background-color: var(--primary-red);
    color: ${COLOR_FAFAFA};
  }
`
