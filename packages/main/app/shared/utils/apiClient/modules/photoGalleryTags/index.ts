import { z } from "zod"

import { PayloadListResponseSchema } from "@shared/schemas/PayloadListResponseSchema"
import { PhotoGalleryTagSchema } from "@shared/schemas/PhotoGalleryTagSchema"

import { createUrl } from "../createUrl"
import { fetch } from "../fetch"

const ResponseSchema = PayloadListResponseSchema.extend({
  docs: z.array(PhotoGalleryTagSchema),
})

export const photoGalleryTags = async () => {
  const url = createUrl("/api/gallery-tags")
  const response = await fetch<unknown>(url)
  const parsedResponse = ResponseSchema.parse(response)

  return parsedResponse.docs
}
