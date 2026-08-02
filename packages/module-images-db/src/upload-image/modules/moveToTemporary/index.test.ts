import { describe, expect, it, jest } from "bun:test"
import fs from "fs"

import { moveToTemporary } from "."

describe("moveToTemporary", () => {
  it("imageDirectory 内のファイルを、id を付与したファイル名で temporaryDirectory へリネームする", () => {
    const spy = jest.spyOn(fs, "renameSync")
    spy.mockImplementation(() => undefined)

    moveToTemporary(
      "origin-image",
      ".temporary-image",
    )({
      extension: "jpg",
      fileName: "test",
      id: "uuid",
    })

    expect(spy).toHaveBeenCalledWith("origin-image/test.jpg", ".temporary-image/test-uuid.jpg")

    spy.mockRestore()
  })
})
