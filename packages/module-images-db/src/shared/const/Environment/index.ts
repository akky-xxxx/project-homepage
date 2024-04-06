import { env } from "bun"

import { environmentSchema } from "../../schema/environmentSchema"

export const Environment = environmentSchema.parse(env)
