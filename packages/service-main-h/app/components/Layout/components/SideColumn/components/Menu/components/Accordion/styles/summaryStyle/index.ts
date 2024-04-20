import { css } from "@panda/css"

export const summaryStyle = css({
  alignItems: "center",
  cursor: "pointer",
  display: "flex !important", // TODO: cx 使った際にプロパティが共存しなくなるなら important を消す
  justifyContent: "space-between",

  "&::-webkit-details-marker": {
    display: "none",
  },

  "& + ul": {
    paddingLeft: "{spacing.s12}",
  },
})
