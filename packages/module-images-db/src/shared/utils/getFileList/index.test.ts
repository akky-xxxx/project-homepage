import { describe, expect, it, mock } from "bun:test"

await mock.module("../storageBucket", () => ({
  storageBucket: {
    getFiles: () => Promise.resolve([[{ name: "image1.avif" }, { name: "image2.thumb.avif" }]]),
  },
}))

const { getFileList } = await import(".")

describe("shared/utils/getFileList", () => {
  it("storageBucket.getFiles で取得したファイルの name の配列を返す", async () => {
    const output: string[] = await getFileList()
    expect(output).toStrictEqual(["image1.avif", "image2.thumb.avif"])
  })
})
