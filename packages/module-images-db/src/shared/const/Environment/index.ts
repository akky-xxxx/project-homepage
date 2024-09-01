import { env } from "bun"

import { EnvironmentSchema } from "../../schemas/EnvironmentSchema"

export const Environment = EnvironmentSchema.parse(env)
