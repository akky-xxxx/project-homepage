import { z } from "zod"

export const EnvironmentSchema = z.object({
  BUCKET: z.string(),
})
