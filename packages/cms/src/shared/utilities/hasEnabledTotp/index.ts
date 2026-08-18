import type { DBAdapter } from "better-auth/types"

/**
 * 指定したメールアドレスのユーザーが TOTP(二要素認証)を有効化済みかを判定する。
 * 該当ユーザーが存在しない場合は false を返し、認証情報の誤りとしての扱いは
 * Better Auth 本来のサインイン処理に委ねる。
 * @param adapter Better Auth の DB adapter (`ctx.context.adapter`)
 * @param email 判定対象のメールアドレス
 * @returns TOTP を有効化していれば true
 */
export const hasEnabledTotp = async (adapter: DBAdapter, email: string): Promise<boolean> => {
  const user = await adapter.findOne<{ twoFactorEnabled: boolean | null }>({
    model: "user",
    where: [{ field: "email", value: email }],
  })

  return user?.twoFactorEnabled ?? false
}
