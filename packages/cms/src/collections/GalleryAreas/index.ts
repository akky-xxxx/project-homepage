import { isAdmin } from "@/shared/utilities/isAdmin"
import { isApiClient } from "@/shared/utilities/isApiClient"

import type { CollectionConfig } from "payload"

export const GalleryAreas: CollectionConfig = {
  slug: "gallery-areas",

  admin: {
    useAsTitle: "name",
  },

  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: ({ req }) => isAdmin({ req }) || isApiClient({ req }),
    update: isAdmin,
  },

  fields: [{ name: "name", required: true, type: "text", unique: true }],
}
