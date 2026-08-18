import { getPayload } from "payload"

import config from "@/payload.config"

/**
 * 指定したユーザーの role を admin に更新する。`seedPasswordTestUser` は
 * internalAdapter 経由で作成するため、他のテストが先に admin を作った後だと
 * first-user-admin ガードの対象外になり role が "user" のままになる。
 * password ログイン後に管理画面(dashboard)へ到達できる必要があるテストで使う。
 * @param userId 対象ユーザーの ID
 */
export const promoteTestUserToAdmin = async (userId: string): Promise<void> => {
  const payload = await getPayload({ config })

  await payload.update({
    collection: "users",
    data: { role: "admin" },
    id: userId,
    user: { role: "admin" },
  })
}
