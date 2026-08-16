"use client"

import { passkeyClient } from "@better-auth/passkey/client"
import { createAuthClient } from "@delmaredigital/payload-better-auth/client"
import { twoFactorClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  plugins: [passkeyClient(), twoFactorClient()],
})
