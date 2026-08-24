import { z } from "zod"

import { PayloadListResponseSchema } from "@shared/schemas/PayloadListResponseSchema"
import { PhotoGallerySchema } from "@shared/schemas/PhotoGallerySchema"

import { createUrl } from "../createUrl"
import { fetch } from "../fetch"

type Options = Pick<z.infer<typeof PayloadListResponseSchema>, "limit" | "page">

const ResponseSchema = PayloadListResponseSchema.extend({
  docs: z.array(PhotoGallerySchema),
})

export const photoGallery = async (options: Options) => {
  const url = createUrl("/api/gallery-photos", options)
  const response = await fetch<unknown>(url)
  return ResponseSchema.parse(response)
}
