/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/consistent-type-assertions */
import { describe, it, expect } from "bun:test"

import { getSiblingImages } from "."

import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

// @ts-expect-error
const baseArray = [
  { area: "location-a", date: "2024-01-01", imageId: "image-1", tags: ["tag-a"] },
  { area: "location-a", date: "2024-01-02", imageId: "image-2", tags: ["tag-a"] },
  { area: "location-a", date: "2024-01-03", imageId: "image-3", tags: ["tag-a"] },
] as ImagesDataBaseRecord[]

describe("getSiblingImages", () => {
  it("先頭でも末尾でもない画像の場合、前後の画像を返す", () => {
    const result = getSiblingImages("image-2", baseArray, {})
    expect(result).toStrictEqual([baseArray[0], baseArray[2]])
  })

  it("先頭の画像の場合、前は undefined、次の画像を返す", () => {
    const result = getSiblingImages("image-1", baseArray, {})
    expect(result).toStrictEqual([undefined, baseArray[1]])
  })

  it("末尾の画像の場合、前の画像、次は undefined を返す", () => {
    const result = getSiblingImages("image-3", baseArray, {})
    expect(result).toStrictEqual([baseArray[1], undefined])
  })

  it("検索条件で絞り込まれた配列に対象の imageId が含まれない場合、前後とも undefined を返す", () => {
    const result = getSiblingImages("image-2", baseArray, { location: "location-b" })
    expect(result).toStrictEqual([undefined, undefined])
  })

  it("検索条件を指定した場合、絞り込み後の前後の画像を返す", () => {
    const searchQueries = { tag: ["tag-a"] }
    const result = getSiblingImages("image-2", baseArray, searchQueries)
    expect(result).toStrictEqual([baseArray[0], baseArray[2]])
  })
})
