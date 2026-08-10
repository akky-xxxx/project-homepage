import { z } from "zod"

// `/sign-in/email` と `/sign-up/email` の before hook で参照するのは email だけのため、
// 他のキーは検証しない
export const EmailBodySchema = z.object({
  email: z.string(),
})
