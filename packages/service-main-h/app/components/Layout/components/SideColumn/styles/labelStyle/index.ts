import { css } from "@panda/css"

export const labelStyle = css({
  backgroundColor: "var(--secondary-background)",
  borderRadius: "4px",
  bottom: "{spacing.s12}",
  height: "{sizes.menuIcon}",
  placeContent: "center",
  position: "fixed",
  right: "{spacing.s12}",
  width: "{sizes.menuIcon}",
  zIndex: "{zIndex.sideColumn.label}",

  _pc: {
    display: "none",
  },

  _sp: {
    display: "grid",
  },
})
