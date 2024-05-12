import { describe, it, expect } from "bun:test"

import { getPageForAnchor } from "."

type GetPageForAnchor = typeof getPageForAnchor
type Props = Parameters<GetPageForAnchor>[0]
type Return = ReturnType<GetPageForAnchor>
type TestCase = [Props, Return]

describe("getPageForAnchor", () => {
  it.each<TestCase>([
    [{ currentPage: 2, value: "previous" }, 1],
    [{ currentPage: 2, value: "next" }, 3],
    [{ currentPage: 2, value: 1 }, 1],
  ])("引数が「%o」の時、「%i」を返す", (input, output) => {
    expect(getPageForAnchor(input)).toStrictEqual(output)
  })
})
