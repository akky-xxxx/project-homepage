import { describe, expect, it } from "bun:test"

import { createUrl } from "."

describe("shared/utils/apiClient/modules/createUrl", () => {
  it("追加のクエリパラメータが無い場合、BASE_SEARCH_PARAMETERS のみでクエリ文字列を組み立てる", () => {
    expect(createUrl("/api/gallery-areas")).toBe(
      "/api/gallery-areas?depth=2&draft=false&limit=0&trash=false",
    )
  })

  it("追加のクエリパラメータを BASE_SEARCH_PARAMETERS とマージする", () => {
    expect(createUrl("/api/gallery-photos", { page: 2 })).toBe(
      "/api/gallery-photos?depth=2&draft=false&limit=0&trash=false&page=2",
    )
  })

  it("追加のクエリパラメータが BASE_SEARCH_PARAMETERS と同名キーの場合、追加側の値で上書きする", () => {
    expect(createUrl("/api/gallery-photos", { limit: 10 })).toBe(
      "/api/gallery-photos?depth=2&draft=false&limit=10&trash=false",
    )
  })
})
