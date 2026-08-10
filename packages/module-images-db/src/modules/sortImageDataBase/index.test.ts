import { describe, expect, it } from "bun:test"

import { sortImageDataBase } from "."

const BASE = {
  area: "神奈川県",
  date: "2020-01-01",
  imageId: "image-b",
}

describe("sortImageDataBase", () => {
  describe("date が異なる場合", () => {
    it("a の date が b より新しい場合、a が先(-1)になる", () => {
      const a = { ...BASE, date: "2020-01-02" }
      const b = { ...BASE, date: "2020-01-01" }
      expect(sortImageDataBase(a, b)).toBe(-1)
    })

    it("a の date が b より古い場合、b が先(1)になる", () => {
      const a = { ...BASE, date: "2020-01-01" }
      const b = { ...BASE, date: "2020-01-02" }
      expect(sortImageDataBase(a, b)).toBe(1)
    })
  })

  describe("date が同じで imageId が異なる場合", () => {
    it("a の imageId が b より大きい場合、b が先(1)になる", () => {
      const a = { ...BASE, imageId: "image-b" }
      const b = { ...BASE, imageId: "image-a" }
      expect(sortImageDataBase(a, b)).toBe(1)
    })

    it("a の imageId が b より小さい場合、a が先(-1)になる", () => {
      const a = { ...BASE, imageId: "image-a" }
      const b = { ...BASE, imageId: "image-b" }
      expect(sortImageDataBase(a, b)).toBe(-1)
    })
  })

  describe("date と imageId が同じ場合", () => {
    it("a の area が b より大きい場合、1 を返す", () => {
      const a = { ...BASE, area: "b-area" }
      const b = { ...BASE, area: "a-area" }
      expect(sortImageDataBase(a, b)).toBe(1)
    })

    it("a の area が b 以下の場合、-1 を返す", () => {
      const a = { ...BASE, area: "a-area" }
      const b = { ...BASE, area: "b-area" }
      expect(sortImageDataBase(a, b)).toBe(-1)
    })
  })

  describe("date が同じで imageId が欠落している場合", () => {
    it.each([
      [
        { ...BASE, imageId: "" },
        { ...BASE, imageId: "image-a" },
      ],
      [
        { ...BASE, imageId: "image-a" },
        { ...BASE, imageId: "" },
      ],
    ])("エラーを投げる", (a, b) => {
      expect(() => sortImageDataBase(a, b)).toThrow("Not captured")
    })
  })
})
