import { describe, it, expect } from "bun:test"

import { getHref } from "."

describe("shared/utils/getHref", () => {
  it.each<[Parameters<typeof getHref>[0], string]>([
    [{ id: "PhotoGallery" }, "/photo-gallery"],
    [{ id: "PhotoDetail", imageId: "image-id-value" }, "/photo/image-id-value"],
    [
      { id: "PhotoLocationDetail", location: "location-value" },
      "/photo-gallery?location=location-value",
    ],
    [{ id: "PhotoDateDetail", date: "date-value" }, "/photo-gallery?date=date-value"],
    [{ id: "PhotoTagDetail", tag: "tag-value" }, "/photo-gallery?tag=tag-value"],
  ] as const)("引数が「%o」の時、「%s」を返す", (input, output) => {
    expect(getHref(input)).toBe(output)
  })
})
