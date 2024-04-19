/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/consistent-type-assertions, sonarjs/no-duplicate-string */
import { describe, it, expect } from "bun:test"

import { isSameLocation } from "."

import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

// @ts-expect-error
const baseArray = [
  { area: "location-value" },
  { area: "location-value1" },
] as ImagesDataBaseRecord[]

describe("isSameLocation", () => {
  it("対象配列内の area と一致する引数を含んだものだけ抽出する", () => {
    const result = baseArray.filter(isSameLocation("location-value"))
    // @ts-expect-error
    expect(result).toStrictEqual([{ area: "location-value" }])
  })
})
