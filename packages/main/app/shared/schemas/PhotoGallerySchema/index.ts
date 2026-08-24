import { z } from "zod"

import { PhotoGalleryAreaSchema } from "../PhotoGalleryAreaSchema"
import { PhotoGalleryTagSchema } from "../PhotoGalleryTagSchema"

import type { GalleryPhoto } from "cms-types/src"

export const PhotoGallerySchema = z.object({
  area: PhotoGalleryAreaSchema,
  createdAt: z.iso.datetime(),
  date: z.iso.datetime(),
  id: z.number(),
  tags: z.array(PhotoGalleryTagSchema),
  thumbnailURL: z.string().nullish(),
  updatedAt: z.iso.datetime(),
  url: z.string().nullish(),
}) satisfies z.ZodType<GalleryPhoto>
