import { css } from "@panda/css"

export const rootStyle = css({
  backgroundColor: "var(--secondary-background)",
  gridColumnStart: 1,
  overflow: "auto",
  paddingBlock: "{spacing.s20}",
  transition: "background-color {animations.02}",

  _pc: {
    height: "100dvh",
  },
})
