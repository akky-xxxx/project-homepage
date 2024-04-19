import { describe, it, expect } from "bun:test"

import { getQueries } from "."

import type { FilterQueries } from "@shared/types/FilterQueries"

describe("getQueries", () => {
  it.each<{ input?: FilterQueries; output: string }>([
    { input: undefined, output: "" },
    { input: {}, output: "" },
    { input: { date: "2024-01-01" }, output: "date=2024-01-01" },
    { input: { location: "神奈川県" }, output: "location=神奈川県" },
    { input: { tag: "タグ" }, output: "tag=タグ" },
    {
      input: {
        date: "2024-01-01",
        location: "神奈川県",
        tag: "タグ",
      },
      output: "date=2024-01-01&location=神奈川県&tag=タグ",
    },
  ] as const)("引数が「$input」の時、「$output」を返す", ({ input, output }) => {
    expect(getQueries(input)).toBe(output)
  })
})
