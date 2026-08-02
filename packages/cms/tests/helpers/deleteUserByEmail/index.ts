import { getPayload } from "payload"

import config from "@/payload.config"

import { deleteRelatedAuthRows } from "../deleteRelatedAuthRows"

/**
 * 指定したメールアドレスのユーザーと、それに紐づく認証関連の行を削除する。
 * @param email 削除対象のメールアドレス
 */
export const deleteUserByEmail = async (email: string): Promise<void> => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
  })
  for (const document_ of docs) {
    await deleteRelatedAuthRows(String(document_.id))
  }

  await payload.delete({
    collection: "users",
    where: { email: { equals: email } },
  })
}
