import { payloadAdapter } from '@delmaredigital/payload-better-auth'
import { betterAuth } from 'better-auth'
import { testUtils } from 'better-auth/plugins'
import { getPayload } from 'payload'

import config from '../../src/payload.config.js'
import { betterAuthOptions } from '@/shared/utilities/betterAuthOptions'
import { getBaseUrl } from '@/shared/utilities/getBaseUrl'

/**
 * テストコードから直接セッション/クッキーを発行するための、
 * testUtils() 付き Better Auth インスタンス。
 * 本番の payload.config.ts には登録しない(テスト専用)。
 */
export const createTestAuth = async () => {
  const payload = await getPayload({ config })
  const baseUrl = getBaseUrl()

  return betterAuth({
    ...betterAuthOptions,
    database: payloadAdapter({ payloadClient: payload }),
    advanced: { database: { generateId: 'serial' } },
    baseURL: baseUrl,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [baseUrl],
    plugins: [...(betterAuthOptions.plugins ?? []), testUtils()],
  })
}
