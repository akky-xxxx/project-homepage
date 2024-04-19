/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/consistent-type-assertions, sonarjs/no-duplicate-string */
import { describe, it, expect } from "bun:test"

import { isStartsWithDate } from "."

import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

const baseArray = [
  { date: "2024-01-01" },
  { date: "2024-01-12" },
  { date: "2024-02-01" },
] as ImagesDataBaseRecord[]

describe("isStartsWithDate", () => {
  it("対象配列内の date と前方一致する引数を含んだものだけ抽出する（月単位）", () => {
    const result = baseArray.filter(isStartsWithDate("2024-01"))
    expect(result).toStrictEqual([
      // @ts-expect-error
      { date: "2024-01-01" },
      // @ts-expect-error
      { date: "2024-01-12" },
    ])
  })

  it("対象配列内の date と前方一致する引数を含んだものだけ抽出する（日単位）", () => {
    const result = baseArray.filter(isStartsWithDate("2024-01-01"))
    expect(result).toStrictEqual([
      // @ts-expect-error
      { date: "2024-01-01" },
    ])
  })
})
