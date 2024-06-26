import { css } from "hono/css"

import { ThumbnailWidth } from "@shared/styles/ThumbnailWidth"

export const thumbnailStyle = css`
  height: 20rem;
  width: ${ThumbnailWidth}rem;
  object-fit: cover;
  object-position: center center;
`
