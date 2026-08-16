import { getPayload } from "payload"

import config from "@/payload.config"

import { deleteRelatedAuthRows } from "../deleteRelatedAuthRows"
import { testUser } from "../testUser"

/**
 * passkey ログインの e2e テスト用ユーザーを作成する。
 * パスワードは扱わない(passkey-only 認証のため)。
 * @param email 作成するユーザーのメールアドレス(既定は `testUser.email`)
 * @returns 作成したユーザーの ID
 */
export const seedTestUser = async (email: string = testUser.email): Promise<{ id: string }> => {
  const payload = await getPayload({ config })

  const { docs: existingUsers } = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
  })
  for (const existingUser of existingUsers) {
    await deleteRelatedAuthRows(String(existingUser.id))
  }

  await payload.delete({
    collection: "users",
    where: { email: { equals: email } },
  })

  // role の付与には req.user が admin である必要がある(betterAuthCollections の
  // first-user-admin ガードが、admin による作成でない限りクライアント指定の role を無視するため)。
  const user = await payload.create({
    collection: "users",
    data: { ...testUser, email, role: "admin" },
    user: { role: "admin" },
  })

  return { id: String(user.id) }
}
