import { describe, expect, it, mock } from "bun:test"

const uploadCalls: string[] = []
const addAllUsersCalls: string[] = []

await mock.module("../../../shared/utils/storageBucket", () => ({
  storageBucket: {
    file: (name: string) => ({
      acl: {
        owners: {
          addAllUsers: () => {
            addAllUsersCalls.push(name)
            return Promise.resolve()
          },
        },
      },
    }),
    upload: (filePath: string) => {
      uploadCalls.push(filePath)
      return Promise.resolve()
    },
  },
}))

const { upload } = await import(".")

describe("upload-image/upload", () => {
  it("main と thumbnail の両方を temporaryDirectory からアップロードし、公開設定にする", async () => {
    await upload(".temporary-image")({
      extension: "jpg",
      fileName: "test",
      id: "uuid",
    })

    expect(uploadCalls).toStrictEqual([
      ".temporary-image/test-uuid.avif",
      ".temporary-image/test-uuid.thumb.avif",
    ])
    expect(addAllUsersCalls).toStrictEqual(["test-uuid.avif", "test-uuid.thumb.avif"])
  })
})
