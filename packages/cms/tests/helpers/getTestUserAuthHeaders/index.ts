import { createTestAuth } from "../createTestAuth"

/**
 * 管理画面ログイン済みのセッション Cookie を含む Headers を取得する。
 * REST エンドポイントへの fetch/Request にそのまま headers として渡せる。
 * @param userId 対象ユーザーの ID
 * @returns セッション Cookie 付きの Headers
 */
export const getTestUserAuthHeaders = async (userId: string): Promise<Headers> => {
  const auth = await createTestAuth()
  const context = await auth.$context

  return context.test.getAuthHeaders({ userId })
}
