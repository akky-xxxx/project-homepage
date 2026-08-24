import { z } from "zod"

import { createUrl } from "../createUrl"
import { fetch } from "../fetch"

const ResponseSchema = z.object({
  months: z.array(z.string()),
})

export const photoGalleryDates = async () => {
  const url = createUrl("/api/gallery-photos/months")
  const response = await fetch<unknown>(url)
  const parsedResponse = ResponseSchema.parse(response)

  return parsedResponse.months
}
