import type { ExteriorMode } from "../../types/ExteriorMode"

export const ExteriorModes = {
  // const は upper came のルールなため
  /* eslint-disable @typescript-eslint/naming-convention */
  Dark: "dark",
  Light: "light",
  /* eslint-enable @typescript-eslint/naming-convention */
} as const satisfies Record<string, ExteriorMode>
