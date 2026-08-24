import { z } from "zod"

import { PayloadListResponseSchema } from "@shared/schemas/PayloadListResponseSchema"
import { PhotoGalleryAreaSchema } from "@shared/schemas/PhotoGalleryAreaSchema"

import { createUrl } from "../createUrl"
import { fetch } from "../fetch"

const ResponseSchema = PayloadListResponseSchema.extend({
  docs: z.array(PhotoGalleryAreaSchema),
})

export const photoGalleryAreas = async () => {
  const url = createUrl("/api/gallery-areas")
  const response = await fetch<unknown>(url)
  const parsedResponse = ResponseSchema.parse(response)

  return parsedResponse.docs
}
