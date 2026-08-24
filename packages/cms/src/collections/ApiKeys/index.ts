import { isAdmin } from "@/shared/utilities/isAdmin"

import type { CollectionConfig } from "payload"

export const ApiKeys: CollectionConfig = {
  slug: "api-keys",

  auth: {
    disableLocalStrategy: true,
    useAPIKey: true,
  },

  access: {
    admin: isAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },

  fields: [],
}
