import { z } from "zod"

/**
 * @description
 * Payload CMS の REST API 一覧取得エンドポイント(`find`)が返すレスポンスのうち、
 * ページネーション用メタデータ部分のスキーマ。`docs` フィールドを含まないため、
 * 利用側は `.extend({ docs: ... })` で実際のドキュメント配列の型を追加して使う。
 */
export const PayloadListResponseSchema = z.object({
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
  limit: z.number(),
  nextPage: z.number().nullable(),
  page: z.number(),
  pagingCounter: z.number(),
  prevPage: z.number().nullable(),
  totalDocs: z.number(),
  totalPages: z.number(),
})
