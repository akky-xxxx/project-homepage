import type { DBAdapter } from "better-auth/types"

const NO_USERS = 0

/**
 * users が 1 件でも存在するかを判定する。
 * サインアップを最初の 1 人だけに限定するための判定に使う。
 * @param adapter Better Auth の DB adapter (`ctx.context.adapter`)
 * @returns 1 件以上存在すれば true
 */
export const hasAnyUser = async (adapter: DBAdapter): Promise<boolean> => {
  const userCount = await adapter.count({ model: "user", where: [] })

  return userCount > NO_USERS
}
