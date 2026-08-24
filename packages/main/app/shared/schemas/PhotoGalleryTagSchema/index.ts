import { z } from "zod"

import type { GalleryTag } from "cms-types/src"

export const PhotoGalleryTagSchema = z.object({
  createdAt: z.iso.datetime(),
  id: z.number(),
  name: z.string(),
  updatedAt: z.iso.datetime(),
}) satisfies z.ZodType<GalleryTag>
