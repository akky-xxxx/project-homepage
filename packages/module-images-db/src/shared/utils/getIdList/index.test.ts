import { getIdList } from "./index"

describe("shared/utils/getIdList", () => {
  it("「.thumb」は削除される。拡張子は含まれない", () => {
    const output = getIdList([
      "image1.thumb.avif",
      "image1.avif",
      "image2.avif",
      "image2.thumb.avif",
    ])
    expect(output).toStrictEqual(["image1", "image2"])
  })
})
