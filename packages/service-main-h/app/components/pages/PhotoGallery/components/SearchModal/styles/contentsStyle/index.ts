import { css } from "hono/css"

import { LayerIndex } from "../../const/LayerIndex"

export const contentsStyle = css`
  height: 100%;
  position: relative;
  overflow-y: auto;
  z-index: ${LayerIndex.CONTENT};
`
