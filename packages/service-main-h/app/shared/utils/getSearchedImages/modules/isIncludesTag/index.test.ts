/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/consistent-type-assertions */
import { describe, it, expect } from "bun:test"

import { isIncludesTag } from "."

import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

// @ts-expect-error
const baseArray = [{ tags: ["tag-value"] }, { tags: ["tag-value1"] }] as ImagesDataBaseRecord[]

describe("isIncludesTag", () => {
  it("対象配列内の tags array に引数を含んだものだけ抽出する", () => {
    const result = baseArray.filter(isIncludesTag("tag-value"))
    // @ts-expect-error
    expect(result).toStrictEqual([{ tags: ["tag-value"] }])
  })
})
