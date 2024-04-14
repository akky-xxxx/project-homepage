import { describe, it, expect } from "bun:test"

import { getHref } from "."

describe("shared/utils/getHref/index.test.ts", () => {
  it.each<[Parameters<typeof getHref>[0], string]>([
    [{ id: "PhotoGallery" }, "/photo-gallery"],
    [{ id: "PhotoDetail", imageId: "image-id-value" }, "/photo/image-id-value"],
  ] as const)("引数が「%o」の時、「%s」を返す", (input, output) => {
    expect(getHref(input)).toBe(output)
  })
})
