import { describe, it, expect } from "bun:test"

import { getExteriorMode } from "."

describe("shared/utils/getExteriorMode/index.test.ts", () => {
  describe("「light」を返すパターン", () => {
    it.each([
      [{}, "light"],
      ["", "light"],
      ["test", "light"],
      ["light", "light"],
    ] as const)("引数が「%o」の時", (input, output) => {
      expect(getExteriorMode(input)).toBe(output)
    })
  })

  describe("「dark」を返すパターン", () => {
    it("引数が[dark」の時", () => {
      expect(getExteriorMode("dark")).toBe("dark")
    })
  })
})
