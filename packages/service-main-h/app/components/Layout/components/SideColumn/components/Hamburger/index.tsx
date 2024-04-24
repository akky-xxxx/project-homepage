import { css } from "hono/css"

import type { FC } from "hono/jsx"

export const Hamburger: FC = () => (
  <div class={root}>
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
)

const root = css`
  height: 25px;
  position: relative;
  width: 25px;

  & > div {
    background-color: var(--primary-color);
    height: 4px;
    position: absolute;
    transition: transform 0.2s ease;

    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(4),
    &:nth-of-type(5) {
      width: 75%;
      border-radius: 9999px;
    }

    &:nth-of-type(1) {
      left: 0;
      top: 1px;
      transform-origin: top left;

      :checked + div & {
        transform: rotate(45deg) translateY(-3px);
      }
    }

    &:nth-of-type(2) {
      right: 0;
      top: 1px;
      transform-origin: top right;

      :checked + div & {
        transform: rotate(-45deg) translateY(-3px);
      }
    }

    &:nth-of-type(3) {
      border-radius: 9999px;
      bottom: 0;
      left: 0;
      margin-block: auto;
      right: 0;
      top: 0;

      :checked + div & {
        transform: scaleX(0);
      }
    }

    &:nth-of-type(4) {
      bottom: 1px;
      left: 0;
      transform-origin: bottom left;

      :checked + div & {
        transform: rotate(-45deg) translateY(3px);
      }
    }

    &:nth-of-type(5) {
      bottom: 1px;
      right: 0;
      transform-origin: bottom right;

      :checked + div & {
        transform: rotate(45deg) translateY(3px);
      }
    }
  }
`
