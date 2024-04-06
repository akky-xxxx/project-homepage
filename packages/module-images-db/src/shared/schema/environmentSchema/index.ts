import { z } from "zod"

export const environmentSchema = z.object({
  BUCKET: z.string(),
})
