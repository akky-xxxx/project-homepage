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

  // Payload のデフォルト(認証済みなら許可)に委ねると、初期登録の競合などで
  // admin から降格されたユーザーが残った場合に自力で role を戻せてしまうため、明示する。
  // better-auth 側の書き込みは payloadAdapter が overrideAccess: true で行うため影響を受けない
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
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
  },

  fields: [
    { name: "email", required: true, type: "email", unique: true },
    {
      defaultValue: false,
      name: "emailVerified",
      type: "checkbox",

      access: { create: isAdmin, update: isAdmin },
    },
    { name: "name", type: "text" },
    { name: "image", type: "text" },
    {
      name: "role",

      defaultValue: "user",
      type: "select",

      // コレクション単位の update が緩められた場合でも権限昇格が起きないようにする
      access: { create: isAdmin, update: isAdmin },

      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ],
    },
  ],
}
