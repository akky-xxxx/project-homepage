import { describe, it, expect } from "bun:test"

import { getPhotoGalleryHref } from "."

describe("shared/utils/getHref/modules/getPhotoGalleryHref", () => {
  it("id が「PhotoGallery」以外の場合、エラーを投げる", () => {
    expect(() => getPhotoGalleryHref({ id: "About" })).toThrow(
      "Do not use this function when id is not PhotoGallery.",
    )
  })

  it("id 以外のプロパティを指定しない場合、クエリなしのパスを返す", () => {
    expect(getPhotoGalleryHref({ id: "PhotoGallery" })).toBe("/photo-gallery")
  })

  it("全てのプロパティを指定した場合、順序通りにクエリを組み立てる", () => {
    expect(
      getPhotoGalleryHref({
        date: "date-value",
        id: "PhotoGallery",
        location: "location-value",
        page: 1,
        tag: ["tag-value"],
      }),
    ).toBe("/photo-gallery?location=location-value&date=date-value&tag=tag-value&page=1")
  })
})
