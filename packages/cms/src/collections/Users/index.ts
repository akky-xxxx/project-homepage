import { betterAuthStrategy } from "@delmaredigital/payload-better-auth"

import { isAdmin } from "@/shared/utilities/isAdmin"

import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",

  admin: {
    useAsTitle: "email",
  },

  auth: {
    disableLocalStrategy: true,
    strategies: [betterAuthStrategy()],
  },

  access: {
    // Payload の Access は boolean か Where を返す契約のため、戻り型は一定にできない
    // eslint-disable-next-line sonarjs/function-return-type
    read: (arguments_) => {
      const { req } = arguments_
      if (!req.user) return false
      if (req.user.role === "admin") return true
      return { id: { equals: req.user.id } }
    },

    admin: isAdmin,
  },

  fields: [
    { name: "email", required: true, type: "email", unique: true },
    { defaultValue: false, name: "emailVerified", type: "checkbox" },
    { name: "name", type: "text" },
    { name: "image", type: "text" },
    {
      name: "role",

      defaultValue: "user",
      type: "select",

      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ],
    },
  ],
}
