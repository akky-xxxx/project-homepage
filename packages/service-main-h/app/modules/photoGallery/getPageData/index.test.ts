import { describe, it, expect } from "bun:test"

import { getPageData } from "."

describe("getPageData", () => {
  describe("currentPage", () => {
    it.each<[string, number]>([
      ["", 1],
      ["test", 1],
      ["Infinity", 1],
      ["NaN", 1],
      ["1", 1],
      ["2", 2],
    ])("page が「%s」の時、「%i」を返す", (input, output) => {
      const { currentPage } = getPageData(input, 10)
      expect(currentPage).toBe(output)
    })
  })

  describe("totalPages", () => {
    it.each<[number, number]>([
      [10, 1],
      [11, 2],
      [20, 2],
      [21, 3],
    ])("allImages が「%i」の時、「%i」を返す", (input, output) => {
      const { totalPages } = getPageData("", input)
      expect(totalPages).toBe(output)
    })
  })
})
