import { describe, it, expect } from "bun:test"

import { getPaginationData } from "."

type GetPaginationData = typeof getPaginationData
type Props = Parameters<GetPaginationData>[0]
type Return = ReturnType<GetPaginationData>

describe("getPaginationData", () => {
  it.each<[Props, Return]>([
    [{ currentPage: 1, totalPages: 14 }, [1, 2, 3, "ellipsis", 14, "next", "last"]],
    [
      { currentPage: 2, totalPages: 14 },
      ["first", "previous", 1, 2, 3, "ellipsis", 14, "next", "last"],
    ],
    [
      { currentPage: 3, totalPages: 14 },
      ["first", "previous", 1, 2, 3, 4, "ellipsis", 14, "next", "last"],
    ],
    [
      { currentPage: 4, totalPages: 14 },
      ["first", "previous", 1, "ellipsis", 3, 4, 5, "ellipsis", 14, "next", "last"],
    ],
    [
      { currentPage: 11, totalPages: 14 },
      ["first", "previous", 1, "ellipsis", 10, 11, 12, "ellipsis", 14, "next", "last"],
    ],
    [
      { currentPage: 12, totalPages: 14 },
      ["first", "previous", 1, "ellipsis", 11, 12, 13, 14, "next", "last"],
    ],
    [
      { currentPage: 13, totalPages: 14 },
      ["first", "previous", 1, "ellipsis", 12, 13, 14, "next", "last"],
    ],
    [{ currentPage: 14, totalPages: 14 }, ["first", "previous", 1, "ellipsis", 12, 13, 14]],
  ])("引数が「%o」の時、「%o」を返す", (input, output) => {
    expect(getPaginationData(input)).toStrictEqual(output)
  })
})
