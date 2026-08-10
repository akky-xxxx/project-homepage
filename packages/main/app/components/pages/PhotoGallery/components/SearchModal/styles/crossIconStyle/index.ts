import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"

const { MEDIA_ONLY_HOVER } = MediaQueries

export const crossIconStyle = css`
  height: 30px;
  position: relative;
  width: 30px;

  &::before,
  &::after {
    background-color: var(--primary-color);
    border-radius: 9999px;
    bottom: 0;
    content: "";
    display: block;
    height: 4px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    transform-origin: center center;
    transition: transform 0.5s ease;
    width: 75%;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  ${MEDIA_ONLY_HOVER} {
    &:hover {
      &::before {
        transform: rotate(405deg);
      }

      &::after {
        transform: rotate(-405deg);
      }
    }
  }
`
