import { getPayload } from "payload"

import config from "@/payload.config"

import { deleteRelatedAuthRows } from "../deleteRelatedAuthRows"
import { testUser } from "../testUser"

export const cleanupTestUser = async (): Promise<void> => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: "users",
    where: { email: { equals: testUser.email } },
  })
  for (const document_ of docs) {
    await deleteRelatedAuthRows(String(document_.id))
  }

  await payload.delete({
    collection: "users",
    where: { email: { equals: testUser.email } },
  })
}
