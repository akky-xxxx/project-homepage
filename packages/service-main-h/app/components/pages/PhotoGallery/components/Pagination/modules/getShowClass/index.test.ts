import { describe, it, expect } from "bun:test"

import { getShowClass } from "."

type GetShowClass = typeof getShowClass
type Props = Parameters<GetShowClass>[0]

describe("getShowClass", () => {
  describe("is-show-pc を返すパターン", () => {
    it.each<Props>([1, "ellipsis"])("引数が「%o」の時", (input) => {
      expect(getShowClass(input)).toStrictEqual("is-show-pc")
    })
  })

  describe("is-show-sp を返すパターン", () => {
    it.each<Props>(["previous", "next"])("引数が「%o」の時", (input) => {
      expect(getShowClass(input)).toStrictEqual("is-show-sp")
    })
  })
})
