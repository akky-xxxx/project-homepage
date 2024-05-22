import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"

import { LayerIndex } from "../../const LayerIndex"

const { MEDIA_SP } = MediaQueries

export const backdropStyle = css`
  background-color: var(--primary-background);
  bottom: 0;
  left: 0;
  opacity: 0.8;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${LayerIndex.BACKDROP};

  ${MEDIA_SP} {
    display: none;
  }
`
