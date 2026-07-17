import { describe, expect, it, mock } from "bun:test"

type SharpCall = {
  args: unknown[]
  method: string
}

const calls: SharpCall[] = []

const makeChain = (path: string) => {
  const chain = {
    avif: () => {
      calls.push({ args: [path], method: "avif" })
      return chain
    },
    metadata: () => {
      calls.push({ args: [path], method: "metadata" })
      return Promise.resolve({ height: 3000, width: 4000 })
    },
    resize: (size: unknown) => {
      calls.push({ args: [path, size], method: "resize" })
      return chain
    },
    toFile: (destination: string) => {
      calls.push({ args: [path, destination], method: "toFile" })
      return Promise.resolve()
    },
  }
  return chain
}

await mock.module("sharp", () => ({ default: makeChain }))

const { optimizeImage } = await import(".")

describe("upload-image/optimizeImage", () => {
  it("メタデータから算出したサイズで main と thumbnail を出力する", async () => {
    await optimizeImage(".temporary-image")({
      extension: "jpg",
      fileName: "test",
      id: "uuid",
    })

    const originFullPath = ".temporary-image/test-uuid.jpg"

    expect(calls).toContainEqual({
      args: [originFullPath],
      method: "metadata",
    })
    expect(calls).toContainEqual({
      args: [originFullPath, { height: 300, width: 400 }],
      method: "resize",
    })
    expect(calls).toContainEqual({
      args: [originFullPath, ".temporary-image/test-uuid.thumb.avif"],
      method: "toFile",
    })
    expect(calls).toContainEqual({
      args: [originFullPath, { height: 1440, width: 1920 }],
      method: "resize",
    })
    expect(calls).toContainEqual({
      args: [originFullPath, ".temporary-image/test-uuid.avif"],
      method: "toFile",
    })
  })
})
