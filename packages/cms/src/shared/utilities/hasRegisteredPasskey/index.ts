import type { DBAdapter } from "better-auth/types"

const NO_PASSKEYS = 0

/**
 * 指定したメールアドレスのユーザーが passkey を登録済みかを判定する。
 * 該当ユーザーが存在しない場合は false を返し、認証情報の誤りとしての扱いは
 * Better Auth 本来のサインイン処理に委ねる。
 * @param adapter Better Auth の DB adapter (`ctx.context.adapter`)
 * @param email 判定対象のメールアドレス
 * @returns passkey を 1 件以上登録していれば true
 */
export const hasRegisteredPasskey = async (adapter: DBAdapter, email: string): Promise<boolean> => {
  const user = await adapter.findOne<{ id: string }>({
    model: "user",
    where: [{ field: "email", value: email }],
  })
  if (user === null) return false

  const passkeyCount = await adapter.count({
    model: "passkey",
    where: [{ field: "userId", value: user.id }],
  })

  return passkeyCount > NO_PASSKEYS
}
