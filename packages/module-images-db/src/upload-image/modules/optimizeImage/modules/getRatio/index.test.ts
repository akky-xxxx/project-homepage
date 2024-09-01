import { getRatio } from "./index"

type GetRatio = typeof getRatio

type GetRatioParameter = Parameters<GetRatio>[0]
type CorrectTestCase = [GetRatioParameter, ReturnType<GetRatio>]

const LONGER_WIDTH_THAN_HEIGHT = [
  {
    height: 3000,
    width: 4000,
  },
  {
    mainSize: {
      height: 1440,
      width: 1920,
    },
    thumbnailSize: {
      height: 300,
      width: 400,
    },
  },
] satisfies CorrectTestCase
const LONGER_HEIGHT_THAN_WIDTH = [
  {
    height: 2000,
    width: 1000,
  },
  {
    mainSize: {
      height: 1920,
      width: 960,
    },
    thumbnailSize: {
      height: 400,
      width: 200,
    },
  },
] satisfies CorrectTestCase
const SQUARE = [
  {
    height: 200,
    width: 200,
  },
  {
    mainSize: {
      height: 1920,
      width: 1920,
    },
    thumbnailSize: {
      height: 400,
      width: 400,
    },
  },
] satisfies CorrectTestCase

describe("upload-image/optimizeImage/getRatio", () => {
  describe("success patterns", () => {
    it.each([
      LONGER_WIDTH_THAN_HEIGHT,
      LONGER_HEIGHT_THAN_WIDTH,
      SQUARE,
    ] satisfies CorrectTestCase[])("引数が「%o」の時、「%o」を返す", (input, output) => {
      expect(getRatio(input)).toStrictEqual(output)
    })
  })

  describe("failure patterns", () => {
    it.each([
      { height: undefined, width: 1000 },
      { height: 1000, width: undefined },
      { height: undefined, width: undefined },
    ] satisfies GetRatioParameter[])("引数が「%o」の時、エラーを投げる", (input) => {
      expect(() => getRatio(input)).toThrow("Not has rectangle size")
    })
  })
})
