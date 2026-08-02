import { z } from "zod"

// 空文字の既定値は、これまで各所で使っていた `process.env.X || ""` の挙動を保つため
export const EnvironmentSchema = z.object({
  BETTER_AUTH_SECRET: z.string().optional(),
  BETTER_AUTH_URL: z.string().optional(),
  PAYLOAD_SECRET: z.string().default(""),
  POSTGRES_URL: z.string().default(""),
  VERCEL_URL: z.string().optional(),
})
