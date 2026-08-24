import { z } from "zod"

import type { GalleryArea } from "cms-types/src"

export const PhotoGalleryAreaSchema = z.object({
  createdAt: z.iso.datetime(),
  id: z.number(),
  name: z.string(),
  updatedAt: z.iso.datetime(),
}) satisfies z.ZodType<GalleryArea>
