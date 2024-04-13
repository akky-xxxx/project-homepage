import { describe, it, expect } from "bun:test"

import { getLightDarkValue } from "."

describe("shared/utils/getLightDarkValue", () => {
  it.each([
    [
      {
        DARK: "#000",
        LIGHT: "#FFF",
      },
      "light-dark(#FFF, #000)",
    ],
    [
      {
        DARK: "#FFF",
        LIGHT: "#000",
      },
      "light-dark(#000, #FFF)",
    ],
  ] as const)("引数が「%o」の時、文字列「%s」を返す", (input, output) => {
    expect(getLightDarkValue(input)).toStrictEqual(output)
  })
})
