import { sortTags } from "."

const TEST_CASE = {
  tags: ["g", "e", "a", "aa", "a", "z"],
}

const output = {
  tags: ["a", "aa", "e", "g", "z"],
}

describe("sortTags", () => {
  it("tags の文字列がユニークになりかつアルファベットオーダーでソートされる", () => {
    expect(sortTags(TEST_CASE)).toStrictEqual(output)
  })
})
