import { isAdmin } from "@/shared/utilities/isAdmin"

import type { CollectionConfig } from "payload"

export const Tags: CollectionConfig = {
  slug: "tags",

  admin: {
    useAsTitle: "name",
  },

  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: () => true,
    update: isAdmin,
  },

  fields: [{ name: "name", required: true, type: "text", unique: true }],
}
