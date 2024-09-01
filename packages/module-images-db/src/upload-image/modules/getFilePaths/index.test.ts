import * as uuid from "uuid"

import { getFilePaths } from "."

const JPG = [
  "test.jpg",
  {
    extension: "jpg",
    fileName: "test",
  },
] as const
const JPEG = [
  "test.jpeg",
  {
    extension: "jpeg",
    fileName: "test",
  },
] as const
const PNG = [
  "test.png",
  {
    extension: "png",
    fileName: "test",
  },
] as const
const GIF = [
  "test.gif",
  {
    extension: "gif",
    fileName: "test",
  },
] as const
const WEBP = [
  "test.webp",
  {
    extension: "webp",
    fileName: "test",
  },
] as const

describe("getFilePaths", () => {
  describe("success", () => {
    it.each([
      JPG,
      JPEG,
      PNG,
      GIF,
      WEBP,
    ] as const)("input が %s の時、 %o を返す", (input, output) => {
      const spy = jest.spyOn(uuid, "v4")
      spy.mockImplementation(() => "uuid")
      expect(getFilePaths([input])).toStrictEqual([{
        ...output,
        id: "uuid",
      }])
    })
  })
})
