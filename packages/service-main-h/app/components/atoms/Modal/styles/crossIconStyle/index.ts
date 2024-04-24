import { css } from "hono/css"

export const crossIconStyle = css`
  background-color: var(--primary-background);
  border-radius: 50%;
  border: 4px solid var(--primary-color);
  height: 45px;
  position: relative;
  width: 45px;

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
    width: 75%;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`
