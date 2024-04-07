import { DefaultExteriorConfig } from "../../../shared/constants/DefaultExteriorConfig"
import { exteriorConfigSchema } from "../../../shared/schemas/exteriorConfigSchema"

import type { ExteriorConfig } from "../../../shared/types/ExteriorConfig"
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"

type GetExteriorConfigInput = ReturnType<RequestCookies["get"]>
type GetExteriorConfigReturn = ExteriorConfig
type GetExteriorConfig = (cookie: GetExteriorConfigInput) => GetExteriorConfigReturn

export const getExteriorConfig: GetExteriorConfig = (cookie) => {
  try {
    return exteriorConfigSchema.parse(JSON.parse(cookie?.value || ""))
  } catch {
    return DefaultExteriorConfig
  }
}
