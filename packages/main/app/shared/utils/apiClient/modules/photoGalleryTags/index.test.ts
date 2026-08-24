import { describe, expect, it, mock } from "bun:test"

const validTag = {
  createdAt: "2026-01-01T00:00:00.000Z",
  id: 1,
  name: "きのこ",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

const validListResponse = {
  docs: [validTag],
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

describe("shared/utils/apiClient/modules/photoGalleryTags", () => {
  it("fetch のレスポンスを parse し、docs のみを返す", async () => {
    await mock.module("../fetch", () => ({
      fetch: () => Promise.resolve(validListResponse),
    }))
    const { photoGalleryTags } = await import(".")

    const response = await photoGalleryTags()

    expect(response).toEqual([validTag])
  })

  it("fetch のレスポンスがスキーマに沿わない場合 parse に失敗する", async () => {
    await mock.module("../fetch", () => ({
      fetch: () => Promise.resolve({ docs: [{}] }),
    }))
    const { photoGalleryTags } = await import(".")

    let thrownError: unknown
    try {
      await photoGalleryTags()
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toBeInstanceOf(Error)
  })
})
