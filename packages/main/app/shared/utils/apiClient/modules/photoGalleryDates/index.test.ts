import { describe, expect, it, mock } from "bun:test"

describe("shared/utils/apiClient/modules/photoGalleryDates", () => {
  it("fetch のレスポンスを parse し、months のみを返す", async () => {
    await mock.module("../fetch", () => ({
      fetch: () => Promise.resolve({ months: ["2026-01-01", "2025-12-01"] }),
    }))
    const { photoGalleryDates } = await import(".")

    const response = await photoGalleryDates()

    expect(response).toEqual(["2026-01-01", "2025-12-01"])
  })

  it("fetch のレスポンスがスキーマに沿わない場合 parse に失敗する", async () => {
    await mock.module("../fetch", () => ({
      fetch: () => Promise.resolve({ months: [1] }),
    }))
    const { photoGalleryDates } = await import(".")

    let thrownError: unknown
    try {
      await photoGalleryDates()
    } catch (error) {
      thrownError = error
    }

    expect(thrownError).toBeInstanceOf(Error)
  })
})
