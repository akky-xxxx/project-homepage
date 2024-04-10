import type { ExteriorMode } from "../../types/ExteriorMode"

export const ExteriorModes = {
  Dark: "dark",
  Light: "light",
} as const satisfies Record<string, ExteriorMode>
