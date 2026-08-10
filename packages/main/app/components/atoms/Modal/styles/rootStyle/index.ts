import { css, keyframes } from "hono/css"

const fadeIn = keyframes`
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: grid;
  }

  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    display: grid;
    opacity: 1;
  }

  99% {
    display: none;
  }

  100% {
    opacity: 0;
  }
`

export const rootStyle = css`
  animation-duration: 0.2s;
  animation-timing-function: ease;
  background-color: var(--primary-background);
  height: 100dvh;
  left: 0;
  place-content: center;
  position: fixed;
  top: 0;
  width: 100dvw;

  &:has(input:checked) {
    animation-name: ${fadeIn};
    display: grid;
  }

  &:has(input:not(:checked)) {
    animation-name: ${fadeOut};
    display: none;
    opacity: 0;
  }
`
