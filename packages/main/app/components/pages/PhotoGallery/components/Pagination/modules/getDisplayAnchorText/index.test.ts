import { describe, it, expect } from "bun:test"

import { getDisplayAnchorText } from "."

type GetDisplayText = typeof getDisplayAnchorText
type Props = Parameters<GetDisplayText>[0]
type Return = ReturnType<GetDisplayText>
type TestCase = [Props, Return]

describe("getDisplayAnchorText", () => {
  describe("引数が文字列の時", () => {
    it.each<TestCase>([
      ["first", "<<"],
      ["previous", "<"],
      ["next", ">"],
      ["last", ">>"],
    ])("引数が「%s」の時、「%s」を返す", (input, output) => {
      expect(getDisplayAnchorText(input)).toStrictEqual(output)
    })
  })

  describe("引数が数値の時", () => {
    it.each<TestCase>([
      [0, 0],
      [1, 1],
    ])("引数が「%i」の時、「%i」を返す", (input, output) => {
      expect(getDisplayAnchorText(input)).toStrictEqual(output)
    })
  })
})
