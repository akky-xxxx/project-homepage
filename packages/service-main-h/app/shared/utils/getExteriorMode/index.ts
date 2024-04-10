import { z } from "zod"

import { ExteriorModes } from "../../const/ExteriorModes"

import type { ExteriorMode } from "../../types/ExteriorMode"

const exteriorModeSchema = z.literal<ExteriorMode>("dark").or(z.literal<ExteriorMode>("light"))

export const getExteriorMode = (value: unknown) => {
  const parsedExteriorMode = exteriorModeSchema.safeParse(value)
  return parsedExteriorMode.success ? parsedExteriorMode.data : ExteriorModes.Light
}
