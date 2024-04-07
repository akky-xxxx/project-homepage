import type { ExteriorConfig } from "../../types/ExteriorConfig"

export const DefaultExteriorConfig = {
  isDarkMode: false,
  isManual: false,
} as const satisfies ExteriorConfig
