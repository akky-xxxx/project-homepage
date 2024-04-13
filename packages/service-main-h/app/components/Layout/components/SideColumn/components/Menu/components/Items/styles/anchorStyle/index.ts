import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"

const { MEDIA_ONLY_HOVER } = MediaQueries

export const anchorStyle = css`
  color: var(--primary-color);
  text-decoration: none;
  transition: background-color 0.2s ease;

  ${MEDIA_ONLY_HOVER} {
    &:hover {
      text-decoration: underline;
    }
  }
`
