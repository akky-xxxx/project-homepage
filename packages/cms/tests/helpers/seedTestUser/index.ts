import { getPayload } from "payload"

import config from "@/payload.config"

import { createTestAuth } from "../createTestAuth"
import { deleteRelatedAuthRows } from "../deleteRelatedAuthRows"
import { testUser } from "../testUser"

const CREDENTIAL_PROVIDER_ID = "credential"

/**
 * admin ログインの e2e テスト用ユーザーを作成する。password は常時必須の第1要素の
 * ため、`testUser.password` でログインできるようにアカウントを紐付ける。
 * 複数の e2e spec ファイルが並列実行されても衝突しないよう、`email` を省略した
 * 場合のみ `testUser.email` を使う(spec ファイルごとに別の email を渡すことを推奨)。
 * @param email 作成するユーザーの email。省略時は `testUser.email`
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
    data: { email, name: testUser.name, role: "admin" },
    user: { role: "admin" },
  })

  const auth = await createTestAuth()
  const context = await auth.$context
  const hashedPassword = await context.password.hash(testUser.password)
  await context.internalAdapter.linkAccount({
    accountId: String(user.id),
    password: hashedPassword,
    providerId: CREDENTIAL_PROVIDER_ID,
    userId: String(user.id),
  })

  return { id: String(user.id) }
}
