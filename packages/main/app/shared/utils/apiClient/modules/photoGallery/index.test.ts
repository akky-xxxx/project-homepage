import { describe, expect, it, mock } from "bun:test"

const validArea = {
  createdAt: "2026-01-01T00:00:00.000Z",
  id: 1,
  name: "神奈川県",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

const validPhoto = {
  area: validArea,
  createdAt: "2026-01-01T00:00:00.000Z",
  date: "2026-01-01T00:00:00.000Z",
  id: 1,
  tags: [],
  thumbnailURL: "https://example.com/photo.thumb.jpg",
  updatedAt: "2026-01-01T00:00:00.000Z",
  url: "https://example.com/photo.jpg",
}

const validListResponse = {
  docs: [validPhoto],
  hasNextPage: false,
  hasPrevPage: false,
  limit: 0,
  nextPage: null,
  page: 1,
  pagingCounter: 1,
  prevPage: null,
  totalDocs: 1,
  totalPages: 1,
}

describe("shared/utils/apiClient/modules/photoGallery", () => {
  it("fetch のレスポンスをスキーマに沿って parse して返す", async () => {
    await mock.module("../fetch", () => ({
      fetch: () => Promise.resolve(validListResponse),
    }))
    const { photoGallery } = await import(".")

    const response = await photoGallery({ limit: 0, page: 1 })

    expect(response).toEqual(validListResponse)
  })

  it("fetch のレスポンスがスキーマに沿わない場合 parse に失敗する", async () => {
    await mock.module("../fetch", () => ({
      fetch: () => Promise.resolve({ docs: [] }),
    }))
    const { photoGallery } = await import(".")

    let thrownError: unknown
    try {
      await photoGallery({ limit: 0, page: 1 })
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toBeInstanceOf(Error)
  })
})
