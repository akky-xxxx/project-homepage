import { describe, expect, it, mock } from "bun:test"

const validArea = {
  createdAt: "2026-01-01T00:00:00.000Z",
  id: 1,
  name: "神奈川県",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

const validListResponse = {
  docs: [validArea],
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

describe("shared/utils/apiClient/modules/photoGalleryAreas", () => {
  it("fetch のレスポンスを parse し、docs のみを返す", async () => {
    await mock.module("../fetch", () => ({
      fetch: () => Promise.resolve(validListResponse),
    }))
    const { photoGalleryAreas } = await import(".")

    const response = await photoGalleryAreas()

    expect(response).toEqual([validArea])
  })

  it("fetch のレスポンスがスキーマに沿わない場合 parse に失敗する", async () => {
    await mock.module("../fetch", () => ({
      fetch: () => Promise.resolve({ docs: [{}] }),
    }))
    const { photoGalleryAreas } = await import(".")

    let thrownError: unknown
    try {
      await photoGalleryAreas()
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toBeInstanceOf(Error)
  })
})
