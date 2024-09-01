// eslint-disable-next-line import/no-unresolved
import { env } from "bun"

import { EnvironmentSchema } from "../../schemas/EnvironmentSchema"

export const ENVIRONMENT = EnvironmentSchema.parse(env)
