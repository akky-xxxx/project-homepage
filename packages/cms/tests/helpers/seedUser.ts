import { getPayload } from 'payload'
import type { TestCookie } from 'better-auth/plugins'

import config from '../../src/payload.config.js'
import { createTestAuth } from './testAuth'

export const testUser = {
  email: 'dev@payloadcms.com',
  name: 'E2E Test User',
}

const relatedAuthCollections = ['sessions', 'accounts', 'passkeys'] as const

/**
 * passkey ログインの e2e テスト用ユーザーを作成する。
 * パスワードは扱わない(passkey-only 認証のため)。
 */
export const seedTestUser = async (): Promise<{ id: string }> => {
  const payload = await getPayload({ config })

  const { docs: existingUsers } = await payload.find({
    collection: 'users',
    where: { email: { equals: testUser.email } },
  })
  for (const existingUser of existingUsers) {
    await deleteRelatedAuthRows(String(existingUser.id))
  }

  await payload.delete({
    collection: 'users',
    where: { email: { equals: testUser.email } },
  })

  // role の付与には req.user が admin である必要がある(betterAuthCollections の
  // first-user-admin ガードが、admin による作成でない限りクライアント指定の role を無視するため)。
  const user = await payload.create({
    collection: 'users',
    data: { ...testUser, role: 'admin' },
    user: { role: 'admin' },
  })

  return { id: String(user.id) }
}

export const cleanupTestUser = async (): Promise<void> => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: testUser.email } },
  })
  for (const doc of docs) {
    await deleteRelatedAuthRows(String(doc.id))
  }

  await payload.delete({
    collection: 'users',
    where: { email: { equals: testUser.email } },
  })
}

const deleteRelatedAuthRows = async (userId: string): Promise<void> => {
  const payload = await getPayload({ config })

  for (const collection of relatedAuthCollections) {
    await payload.delete({
      collection,
      where: { user: { equals: userId } },
    })
  }
}

/**
 * passkey 登録(セッション必須)をブラウザ側で行うための、
 * テストユーザーとしてログイン済みのクッキーを取得する。
 */
export const getTestUserCookies = async (userId: string): Promise<TestCookie[]> => {
  const auth = await createTestAuth()
  const ctx = await auth.$context

  return ctx.test.getCookies({ userId })
}
