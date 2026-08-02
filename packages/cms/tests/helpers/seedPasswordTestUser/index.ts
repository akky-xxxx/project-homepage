import { createTestAuth } from "../createTestAuth"
import { testUser } from "../testUser"

const CREDENTIAL_PROVIDER_ID = "credential"

/**
 * password でサインインできるテストユーザーを作成する。
 * `/sign-up/email` は authBeforeHook が最初の 1 人しか通さないため、
 * エンドポイントを経由せず internalAdapter で直接作成する。
 * @param password 設定するパスワード
 * @returns 作成したユーザーの ID
 */
export const seedPasswordTestUser = async (password: string): Promise<{ id: string }> => {
  const auth = await createTestAuth()
  const context = await auth.$context

  const user = await context.internalAdapter.createUser({ ...testUser })
  const hashedPassword = await context.password.hash(password)

  await context.internalAdapter.linkAccount({
    accountId: user.id,
    password: hashedPassword,
    providerId: CREDENTIAL_PROVIDER_ID,
    userId: user.id,
  })

  return { id: user.id }
}
