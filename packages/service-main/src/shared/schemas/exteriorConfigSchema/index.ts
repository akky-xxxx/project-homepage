import { z } from "zod"

import type { ExteriorConfig } from "../../types/ExteriorConfig"
import type { ZodType } from "zod"

export const exteriorConfigSchema = z.object({
  isDarkMode: z.boolean(),
  isManual: z.boolean(),
}) satisfies ZodType<ExteriorConfig>
