import { css } from "@panda/css"

export const arrowIconWrapperStyle = css({
  fill: "var(--primary-color)",
  height: "16px",
  width: "16px",

  "details > summary > &": {
    transform: "scaleY(1) translateY(-25%)",
  },

  "details[open] > summary > &": {
    transform: "scaleY(-1)",
  },
})
