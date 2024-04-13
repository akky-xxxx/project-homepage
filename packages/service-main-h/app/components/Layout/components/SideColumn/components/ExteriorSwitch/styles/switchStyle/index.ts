import { css } from "hono/css"

import { MediaQueries } from "@shared/styles/MediaQueries"

import { ClassNames } from "../../const/ClassNames"

const Double = 2
const ContentHeight = 3.5
const ContentWidth = 6
const BorderWidth = 0.2
const Diameter = ContentHeight - BorderWidth * Double

const { ICONS, ICON_DAY, ICON_NIGHT } = ClassNames
const { MEDIA_ONLY_HOVER } = MediaQueries

export const switchStyle = css`
  cursor: pointer;
  fill: var(--primary-color);
  height: ${ContentHeight}rem;
  position: relative;
  width: ${ContentWidth}rem;

  .${ICONS}, &::after {
    content: "";
    display: block;
    position: absolute;
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease;
  }
  .${ICONS} {
    background-color: var(--primary-background);
    border-radius: 50%;
    bottom: 0;
    display: grid;
    height: ${Diameter}rem;
    left: ${BorderWidth}rem;
    margin-block: auto;
    place-content: center;
    top: 0;
    transition:
      transform 0.3s ease,
      background-color 0.2s ease;
    width: ${Diameter}rem;
    z-index: 20;

    & > span {
      display: inline-grid;
      place-content: center;
    }
  }
  &::after {
    background-color: transparent;
    border-radius: 9999rem;
    border: ${BorderWidth}rem solid var(--primary-color);
    bottom: 0;
    height: ${ContentHeight}rem;
    margin: auto;
    right: 0;
    top: 0;
    width: ${ContentWidth}rem;
  }

  ${MEDIA_ONLY_HOVER} {
    label:hover &::after {
      border-color: var(--primary-red);
    }
  }

  input:not(:checked) + & {
    .${ICON_NIGHT} {
      display: none;
    }
  }

  input:checked + & {
    .${ICON_DAY} {
      display: none;
    }
  }

  input:checked + & {
    .${ICONS} {
      transform: translateX(${ContentWidth - ContentHeight}rem);
    }
  }
`
