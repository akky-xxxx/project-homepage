import { isAdmin } from "@/shared/utilities/isAdmin"

import type { CollectionConfig } from "payload"

export const GalleryPhotos: CollectionConfig = {
  slug: "gallery-photos",

  admin: {
    useAsTitle: "date",
  },

  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },

  upload: {
    adminThumbnail: "thumbnail",
    formatOptions: {
      format: "avif",
    },
    imageSizes: [
      {
        fit: "inside",
        formatOptions: {
          format: "avif",
        },
        height: 400,
        name: "thumbnail",
        width: 400,
      },
    ],
    mimeTypes: ["image/*"],
    resizeOptions: {
      fit: "inside",
      height: 1920,
      width: 1920,
    },
  },

  fields: [
    { name: "date", required: true, type: "date" },
    { name: "area", relationTo: "gallery-areas", required: true, type: "relationship" },
    { hasMany: true, name: "tags", relationTo: "gallery-tags", type: "relationship" },
  ],
}
