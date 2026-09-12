import { createLocalAccountIssuer } from "@better-auth/core/db"

import { createTestAuth } from "../createTestAuth"
import { testUser } from "../testUser"

const CREDENTIAL_PROVIDER_ID = "credential"

/**
 * password でサインインできるテストユーザーを作成する。
 * `/sign-up/email` は authBeforeHook が最初の 1 人しか通さないため、
 * エンドポイントを経由せず internalAdapter で直接作成する。
 * @param password 設定するパスワード
 * @param email 作成するユーザーのメールアドレス(既定は `testUser.email`)
 * @returns 作成したユーザーの ID
 */
export const seedPasswordTestUser = async (
  password: string,
  email: string = testUser.email,
): Promise<{ id: string }> => {
  const auth = await createTestAuth()
  const context = await auth.$context

  const user = await context.internalAdapter.createUser(
    { ...testUser, email },
    { method: "email-password" },
  )
  const hashedPassword = await context.password.hash(password)

  await context.internalAdapter.linkAccount({
    accountId: user.id,
    issuer: createLocalAccountIssuer(CREDENTIAL_PROVIDER_ID),
    password: hashedPassword,
    providerId: CREDENTIAL_PROVIDER_ID,
    userId: user.id,
  })

  return { id: user.id }
}
