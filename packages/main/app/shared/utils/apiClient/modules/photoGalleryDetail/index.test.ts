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

describe("shared/utils/apiClient/modules/photoGalleryDetail", () => {
  it("fetch のレスポンスをスキーマに沿って parse して返す", async () => {
    await mock.module("../fetch", () => ({
      fetch: () => Promise.resolve(validPhoto),
    }))
    const { photoGalleryDetail } = await import(".")

    const response = await photoGalleryDetail(1)

    expect(response).toEqual(validPhoto)
  })

  it("fetch のレスポンスがスキーマに沿わない場合 parse に失敗する", async () => {
    await mock.module("../fetch", () => ({
      fetch: () => Promise.resolve({}),
    }))
    const { photoGalleryDetail } = await import(".")

    let thrownError: unknown
    try {
      await photoGalleryDetail(1)
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toBeInstanceOf(Error)
  })
})
