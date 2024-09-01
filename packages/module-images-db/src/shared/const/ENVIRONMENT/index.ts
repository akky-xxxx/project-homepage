import { env } from "bun"

import { EnvironmentSchema } from "../../schemas/EnvironmentSchema"

export const ENVIRONMENT = EnvironmentSchema.parse(env)
