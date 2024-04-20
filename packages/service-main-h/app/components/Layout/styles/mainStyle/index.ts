import { css } from "@panda/css"

/* eslint-disable sonarjs/no-duplicate-string */
export const mainStyle = css({
  overflowY: "auto",

  _pc: {
    padding: "{spacing.s20}",
  },

  _sp: {
    height: "calc(100dvh - 81px)",
    paddingBottom: "{spacing.s20}",
    paddingTop: "{spacing.s20}",
  },
})
