import { getPayload } from "payload"

import config from "@/payload.config"

const relatedAuthCollections = ["accounts", "passkeys", "sessions", "twoFactors"] as const

export const deleteRelatedAuthRows = async (userId: string): Promise<void> => {
  const payload = await getPayload({ config })

  for (const collection of relatedAuthCollections) {
    await payload.delete({
      collection,
      where: { user: { equals: userId } },
    })
  }
}
