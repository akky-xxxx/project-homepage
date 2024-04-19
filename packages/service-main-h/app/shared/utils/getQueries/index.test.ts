import { describe, it, expect } from "bun:test"

import { getQueries } from "."

import type { FilterQueries } from "@shared/types/FilterQueries"

describe("getQueries", () => {
  it.each<[FilterQueries | undefined, string]>([
    [undefined, ""],
    [{}, ""],
    [{ date: "2024-01-01" }, "date=2024-01-01"],
    [{ location: "神奈川県" }, "location=神奈川県"],
    [{ tag: "タグ" }, "tag=タグ"],
    [
      {
        date: "2024-01-01",
        location: "神奈川県",
        tag: "タグ",
      },
      "date=2024-01-01&location=神奈川県&tag=タグ",
    ],
  ] as const)("引数が「%o」の時、「%s」を返す", (input, output) => {
    expect(getQueries(input)).toBe(output)
  })
})
