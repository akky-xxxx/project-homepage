import { PhotoGallerySchema } from "@shared/schemas/PhotoGallerySchema"

import { createUrl } from "../createUrl"
import { fetch } from "../fetch"

import type { GalleryPhoto } from "cms-types/src"

const ResponseSchema = PhotoGallerySchema

export const photoGalleryDetail = async (id: GalleryPhoto["id"]) => {
  const pathname = ["/api/gallery-photos", id.toString()].join("/")
  const url = createUrl(pathname)
  const response = await fetch<unknown>(url)
  return ResponseSchema.parse(response)
}
