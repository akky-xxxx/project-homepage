import { createTestAuth } from "../createTestAuth"

import type { TestCookie } from "better-auth/plugins"

/**
 * passkey 登録(セッション必須)をブラウザ側で行うための、
 * テストユーザーとしてログイン済みのクッキーを取得する。
 * @param userId 対象ユーザーの ID
 * @returns ブラウザコンテキストに投入するクッキー
 */
export const getTestUserCookies = async (userId: string): Promise<TestCookie[]> => {
  const auth = await createTestAuth()
  const context = await auth.$context

  return context.test.getCookies({ userId })
}
