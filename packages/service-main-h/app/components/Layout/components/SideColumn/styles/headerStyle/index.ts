import { css } from "@panda/css"

/* eslint-disable sonarjs/no-duplicate-string */
export const headerStyle = css({
  columnGap: "{spacing.s12}",
  display: "flex",

  _pc: {
    justifyContent: "center",
  },

  _sp: {
    justifyContent: "space-between",
    paddingInline: "{spacing.s12}",
  },
})
