import { describe, it, expect } from "bun:test"

import { getPhotoText } from "@shared/utils/getPhotoText"

import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

describe("shared/utils/getPhotoText", () => {
  it.each<[Omit<ImagesDataBaseRecord, "imageId">, string]>([
    [
      {
        area: "神奈川県",
        date: "2024-04-24",
        tags: [],
      },
      "2024年4月24日に神奈川県で撮った写真",
    ],
    [
      {
        area: "神奈川県",
        date: "2025-10-04",
        tags: ["きのこ"],
      },
      "2025年10月4日に神奈川県で撮った「きのこ」の写真",
    ],
    [
      {
        area: "神奈川県",
        date: "2026-10-04",
        tags: ["きのこ", "すすき"],
      },
      "2026年10月4日に神奈川県で撮った「きのこ、すすき」の写真",
    ],
  ])("引数が「%o」の時、「%s」を返す", (input, output) => {
    expect(getPhotoText(input)).toBe(output)
  })
})
