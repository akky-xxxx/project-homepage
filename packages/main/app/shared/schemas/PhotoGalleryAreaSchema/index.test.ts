import { describe, expect, it } from "bun:test"

import { PhotoGalleryAreaSchema } from "."

describe("shared/schemas/PhotoGalleryAreaSchema", () => {
  it("gallery-areas のドキュメントを parse できる", () => {
    const validArea = {
      createdAt: "2026-01-01T00:00:00.000Z",
      id: 1,
      name: "神奈川県",
      updatedAt: "2026-01-01T00:00:00.000Z",
    }

    expect(PhotoGalleryAreaSchema.parse(validArea)).toEqual(validArea)
  })

  it.each<[string, unknown]>([
    ["name が欠落している", { createdAt: "2026-01-01T00:00:00.000Z", id: 1 }],
    [
      "createdAt が ISO 日時ではない",
      { createdAt: "2026-01-01", id: 1, name: "神奈川県", updatedAt: "2026-01-01T00:00:00.000Z" },
    ],
  ])("%s とき parse に失敗する", (_description, input) => {
    expect(PhotoGalleryAreaSchema.safeParse(input).success).toBe(false)
  })
})
