import { getPayload } from "payload"

import config from "@/payload.config"

/**
 * api-keys コレクションにテスト用の API Key を発行する。
 * @param rawApiKey Authorization ヘッダーにそのまま使う生の API Key 文字列
 * @returns 作成したドキュメントの id(cleanup 用)
 */
export const createTestApiKey = async (rawApiKey: string): Promise<number> => {
  const payload = await getPayload({ config })

  const apiKeyDocument = await payload.create({
    collection: "api-keys",
    data: { apiKey: rawApiKey, enableAPIKey: true },
    overrideAccess: true,
  })

  return apiKeyDocument.id
}
