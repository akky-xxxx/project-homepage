import { describe, expect, it } from "bun:test"

import { PayloadListResponseSchema } from "."

describe("shared/schemas/PayloadListResponseSchema", () => {
  it("payload の一覧取得レスポンスのページネーション部分を parse できる", () => {
    const validResponse = {
      hasNextPage: false,
      hasPrevPage: false,
      limit: 0,
      nextPage: null,
      page: 1,
      pagingCounter: 1,
      prevPage: null,
      totalDocs: 3,
      totalPages: 1,
    }

    expect(PayloadListResponseSchema.parse(validResponse)).toEqual(validResponse)
  })

  it.each<[string, unknown]>([
    ["hasNextPage が欠落している", {}],
    [
      "nextPage が number でも null でもない",
      {
        hasNextPage: false,
        hasPrevPage: false,
        limit: 0,
        nextPage: "1",
        page: 1,
        pagingCounter: 1,
        prevPage: null,
        totalDocs: 3,
        totalPages: 1,
      },
    ],
  ])("%s とき parse に失敗する", (_description, input) => {
    expect(PayloadListResponseSchema.safeParse(input).success).toBe(false)
  })
})
