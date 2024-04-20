// eslint-disable-next-line import/no-extraneous-dependencies
import type { Config } from "@pandacss/dev"

const DeviceBreakpoint = 768

export const Conditions = {
  extend: {
    pc: `@media (width > ${DeviceBreakpoint}px)`,
    sp: `@media (width <= ${DeviceBreakpoint}px)`,

    supportHover: ["@media (hover: hover) and (pointer: fine)", "&:hover"],
  },
} satisfies Config["conditions"]
