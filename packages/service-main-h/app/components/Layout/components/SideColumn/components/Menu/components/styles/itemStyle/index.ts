import { css } from "@panda/css"

export const itemStyle = css({
  borderTop: "1px solid var(--primary-color)",
  display: "block",
  padding: "2rem",
  transition: "background-color {animations.03}",

  _supportHover: {
    backgroundColor: "light-dark(#FFE0E0, #663030)",
  },
})
