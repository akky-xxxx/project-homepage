import { describe, expect, it } from "bun:test"

import { PhotoGalleryTagSchema } from "."

describe("shared/schemas/PhotoGalleryTagSchema", () => {
  it("gallery-tags のドキュメントを parse できる", () => {
    const validTag = {
      createdAt: "2026-01-01T00:00:00.000Z",
      id: 1,
      name: "きのこ",
      updatedAt: "2026-01-01T00:00:00.000Z",
    }

    expect(PhotoGalleryTagSchema.parse(validTag)).toEqual(validTag)
  })

  it.each<[string, unknown]>([
    ["name が欠落している", { createdAt: "2026-01-01T00:00:00.000Z", id: 1 }],
    [
      "id が number ではない",
      {
        createdAt: "2026-01-01T00:00:00.000Z",
        id: "1",
        name: "きのこ",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    ],
  ])("%s とき parse に失敗する", (_description, input) => {
    expect(PhotoGalleryTagSchema.safeParse(input).success).toBe(false)
  })
})
