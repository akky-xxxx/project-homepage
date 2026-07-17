/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/consistent-type-assertions */
import { describe, it, expect } from "bun:test"

import { getSearchedImages } from "."

import type { PhotoGallerySearchQueries } from "@shared/types/PhotoGallerySearchQueries"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

// @ts-expect-error
const baseArray = [
  { area: "location-a", date: "2024-01-01", imageId: "image-1", tags: ["tag-a", "tag-b"] },
  { area: "location-a", date: "2024-02-01", imageId: "image-2", tags: ["tag-a"] },
  { area: "location-b", date: "2024-01-15", imageId: "image-3", tags: ["tag-b"] },
] as [ImagesDataBaseRecord, ImagesDataBaseRecord, ImagesDataBaseRecord]

describe("getSearchedImages", () => {
  it("検索条件が空の場合、全件を返す", () => {
    const result = getSearchedImages({})(baseArray)
    expect(result).toStrictEqual(baseArray)
  })

  it("location のみ指定した場合、area が一致するものだけ抽出する", () => {
    const searchQueries: PhotoGallerySearchQueries = { location: "location-a" }
    const result = getSearchedImages(searchQueries)(baseArray)
    expect(result).toStrictEqual([baseArray[0], baseArray[1]])
  })

  it("date のみ指定した場合、date が前方一致するものだけ抽出する", () => {
    const searchQueries: PhotoGallerySearchQueries = { date: "2024-01" }
    const result = getSearchedImages(searchQueries)(baseArray)
    expect(result).toStrictEqual([baseArray[0], baseArray[2]])
  })

  it("tag のみ指定した場合、tags を全て含むものだけ抽出する", () => {
    const searchQueries: PhotoGallerySearchQueries = { tag: ["tag-a", "tag-b"] }
    const result = getSearchedImages(searchQueries)(baseArray)
    expect(result).toStrictEqual([baseArray[0]])
  })

  it("複数条件を組み合わせた場合、AND 条件で抽出する", () => {
    const searchQueries: PhotoGallerySearchQueries = { date: "2024-01", location: "location-a", tag: ["tag-a"] }
    const result = getSearchedImages(searchQueries)(baseArray)
    expect(result).toStrictEqual([baseArray[0]])
  })

  it("どの条件にも一致しない場合、空配列を返す", () => {
    const searchQueries: PhotoGallerySearchQueries = { location: "location-c" }
    const result = getSearchedImages(searchQueries)(baseArray)
    expect(result).toStrictEqual([])
  })
})
