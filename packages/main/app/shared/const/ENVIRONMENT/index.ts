import { EnvironmentSchema } from "@shared/schemas/EnvironmentSchema"

export const ENVIRONMENT = EnvironmentSchema.parse(import.meta.env)
