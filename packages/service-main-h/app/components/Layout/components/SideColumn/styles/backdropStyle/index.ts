import { css } from "@panda/css"

export const backdropStyle = css({
  "label:has(:checked) ~ &": {
    backgroundColor: "var(--primary-background)",
    bottom: 0,
    height: "calc({spacing.s12} * 2 + {sizes.menuIcon})",
    left: 0,
    opacity: 0.8,
    position: "fixed",
    right: 0,
  },
})
