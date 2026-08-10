import { css } from "hono/css"

import { ZIndexes } from "../../const/ZIndexes"

export const contentStyle = css`
  position: relative;
  z-index: ${ZIndexes.CONTENT};
`
