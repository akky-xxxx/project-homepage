import { getExteriorMode } from "./index"

describe("app/modules/getExteriorMode", () => {
  it.each<[boolean, "dark" | "light"]>([
    [true, "dark"],
    [false, "light"],
  ])("引数に「%s」を渡すと「%s」を返す", (input, expectedValue) => {
    expect(getExteriorMode(input)).toBe(expectedValue)
  })
})
