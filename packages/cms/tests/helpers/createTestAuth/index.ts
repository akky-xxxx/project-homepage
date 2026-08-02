import { payloadAdapter } from "@delmaredigital/payload-better-auth"
import { betterAuth } from "better-auth"
import { testUtils } from "better-auth/plugins"
import { getPayload } from "payload"

import config from "@/payload.config"
import { ENVIRONMENT } from "@/shared/const/ENVIRONMENT"
import { betterAuthOptions } from "@/shared/utilities/betterAuthOptions"
import { getBaseUrl } from "@/shared/utilities/getBaseUrl"

/**
 * テストコードから直接セッション/クッキーを発行するための、
 * testUtils() 付き Better Auth インスタンス。
 * 本番の payload.config.ts には登録しない(テスト専用)。
 * @returns testUtils() を有効にした Better Auth インスタンス
 */
export const createTestAuth = async () => {
  const payload = await getPayload({ config })
  const baseUrl = getBaseUrl()

  return betterAuth({
    ...betterAuthOptions,
    database: payloadAdapter({ payloadClient: payload }),

    advanced: { database: { generateId: "serial" } },
    baseURL: baseUrl,
    secret: ENVIRONMENT.BETTER_AUTH_SECRET,
    trustedOrigins: [baseUrl],

    plugins: [...(betterAuthOptions.plugins ?? []), testUtils()],
  })
}
