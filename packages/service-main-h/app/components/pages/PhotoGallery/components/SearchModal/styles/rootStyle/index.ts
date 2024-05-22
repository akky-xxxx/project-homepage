import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"
import { Spaces } from "@shared/styles/Spaces"

import { SearchModalId } from "../../../../const/SearchModalId"

const { MEDIA_PC, MEDIA_SP } = MediaQueries
const { SPACE20 } = Spaces

export const rootStyle = css`
  background-color: var(--primary-background);
  box-shadow:
    2px 0 3px var(--primary-shadow),
    0 2px 3px var(--primary-shadow),
    -2px 0 3px var(--primary-shadow),
    0 -2px 3px var(--primary-shadow);
  display: none;
  position: fixed;
  z-index: 20;

  ${MEDIA_PC} {
    left: ${SPACE20}rem;
    padding: ${SPACE20}rem;
    right: ${SPACE20}rem;
    top: ${SPACE20}rem;
    height: calc(100% - ${SPACE20 + SPACE20}rem);
  }

  ${MEDIA_SP} {
    bottom: 0;
    left: 0;
    padding-bottom: ${SPACE20}rem;
    right: 0;
    top: 0;
  }

  &:has(#${SearchModalId}:checked) {
    display: block;
  }
`
