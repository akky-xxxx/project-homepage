import { describe, it, expect } from "bun:test"

import { useExteriorSwitch } from "."

describe("useExteriorSwitch", () => {
  describe("isChecked の値", () => {
    it.each([
      [
        {
          exteriorMode: "dark",
        },
        true,
      ],
      [
        {
          exteriorMode: "light",
        },
        false,
      ],
    ] as const)("引数が「%o」の時、 isChecked の値は「%o」", (input, output) => {
      expect(useExteriorSwitch(input).isChecked).toBe(output)
    })
  })

  // TODO: hooks のテストを実行できるように調整
  describe.skip("handleChange 1回実行時の isChecked の値", () => {
    it.each([
      [
        {
          exteriorMode: "dark",
        },
        false,
      ],
      [
        {
          exteriorMode: "light",
        },
        true,
      ],
    ] as const)(
      "引数が「%o」の時に、handleChange を1回実行すると isChecked の値は「%s」",
      (input, output) => {
        const dependencies = useExteriorSwitch(input)
        dependencies.handleChange()
        expect(dependencies.isChecked).toBe(output)
      },
    )
  })
})
