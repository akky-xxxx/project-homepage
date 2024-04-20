import { css } from "@panda/css"

export const navigationStyle = css({
  _pc: {
    marginTop: "{spacing.s20}",
  },

  _sp: {
    backgroundColor: "var(--primary-background)",
    bottom: "calc({spacing.s12} * 2 + {sizes.menuIcon})",
    boxShadow: "0 5px 5px var(--primary-shadow)",
    left: 0,
    overflowY: "auto",
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: "{zIndex.sideColumn.navigation}",

    "label:has(:not(:checked)) + &": {
      display: "none",
    },

    "label:has(:checked) + &": {
      display: "block",
    },
  },
})
