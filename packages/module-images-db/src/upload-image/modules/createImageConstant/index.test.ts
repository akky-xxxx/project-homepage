import { describe, expect, it, jest, mock } from "bun:test"
import fs from "fs"

await mock.module("../../../shared/utils/getFileList", () => ({
  getFileList: () =>
    Promise.resolve(["image1.avif", "image1.thumb.avif", "image2.avif", "image2.thumb.avif"]),
}))

const { createImageConstant } = await import(".")

describe("upload-image/createImageConstant", () => {
  it("getFileList から取得した id 一覧を定数ファイルとして書き出す", async () => {
    const spy = jest.spyOn(fs, "writeFileSync")
    spy.mockImplementation(() => undefined)

    await createImageConstant()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("src/const/IMAGES/index.ts"),
      'export const IMAGES = ["image1","image2"] as const',
    )

    spy.mockRestore()
  })
})
