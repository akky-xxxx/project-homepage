import { describe, expect, it } from "bun:test"

import { PhotoGallerySchema } from "."

const validArea = {
  createdAt: "2026-01-01T00:00:00.000Z",
  id: 1,
  name: "神奈川県",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

const validTag = {
  createdAt: "2026-01-01T00:00:00.000Z",
  id: 1,
  name: "きのこ",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

describe("shared/schemas/PhotoGallerySchema", () => {
  it("gallery-photos のドキュメント(area/tags が populate 済み)を parse できる", () => {
    const validPhoto = {
      area: validArea,
      createdAt: "2026-01-01T00:00:00.000Z",
      date: "2026-01-01T00:00:00.000Z",
      id: 1,
      tags: [validTag],
      thumbnailURL: "https://example.com/photo.thumb.jpg",
      updatedAt: "2026-01-01T00:00:00.000Z",
      url: "https://example.com/photo.jpg",
    }

    expect(PhotoGallerySchema.parse(validPhoto)).toEqual(validPhoto)
  })

  it.each<[string, unknown]>([
    [
      "area が欠落している",
      {
        createdAt: "2026-01-01T00:00:00.000Z",
        date: "2026-01-01T00:00:00.000Z",
        id: 1,
        tags: [],
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    ],
    [
      "area が populate されず id のみ(number)になっている",
      {
        area: 1,
        createdAt: "2026-01-01T00:00:00.000Z",
        date: "2026-01-01T00:00:00.000Z",
        id: 1,
        tags: [],
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    ],
    [
      "tags が欠落している",
      {
        area: validArea,
        createdAt: "2026-01-01T00:00:00.000Z",
        date: "2026-01-01T00:00:00.000Z",
        id: 1,
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    ],
  ])("%s とき parse に失敗する", (_description, input) => {
    expect(PhotoGallerySchema.safeParse(input).success).toBe(false)
  })
})
