import { css } from "@panda/css"

export const ulStyle = css({
  display: "grid",
  gap: "{spacing.s20}",
  gridTemplateColumns: "repeat(auto-fit, 30rem)",
  placeContent: "center",
})
