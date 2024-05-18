import { describe, it, expect } from "bun:test"

import { ImagesPerPage } from "@shared/const/ImagesPerPage"

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
      [ImagesPerPage, 1],
      [ImagesPerPage + 1, 2],
      [ImagesPerPage * 2, 2],
      [ImagesPerPage * 2 + 1, 3],
    ])("allImages が「%i」の時、「%i」を返す", (input, output) => {
      const { totalPages } = getPageData("", input)
      expect(totalPages).toBe(output)
    })
  })
})
