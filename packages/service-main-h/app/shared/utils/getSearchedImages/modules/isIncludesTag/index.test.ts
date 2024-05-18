/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/consistent-type-assertions */
import { describe, it, expect } from "bun:test"

import { isIncludesTag } from "."

import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

// @ts-expect-error
const baseArray = [
  { tags: ["tag-a", "tag-b", "tag-c"] },
  { tags: ["tag-a"] },
] as ImagesDataBaseRecord[]

describe("isIncludesTag", () => {
  it.each([
    [[], [{ tags: ["tag-a", "tag-b", "tag-c"] }, { tags: ["tag-a"] }]],
    [["tag-a"], [{ tags: ["tag-a", "tag-b", "tag-c"] }, { tags: ["tag-a"] }]],
    [["tag-a", "tag-b"], [{ tags: ["tag-a", "tag-b", "tag-c"] }]],
  ])("引数が「%o」の時、 filter は「%o」を返す", (input, output) => {
    const result = baseArray.filter(isIncludesTag(input))
    // @ts-expect-error
    expect(result).toStrictEqual(output)
  })
})
