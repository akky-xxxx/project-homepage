import { css } from "hono/css"

import { Double } from "@shared/const/Double"
import { Spaces } from "@shared/styles/Spaces"

import { MenuIconSize } from "../../const/MenuIconSize"

const { SPACE12 } = Spaces

export const backdropStyle = css`
  label:has(:checked) ~ & {
    background-color: var(--primary-background);
    bottom: 0;
    height: calc(${SPACE12 * Double}rem + ${MenuIconSize}px);
    left: 0;
    opacity: 0.8;
    position: fixed;
    right: 0;
  }
`
