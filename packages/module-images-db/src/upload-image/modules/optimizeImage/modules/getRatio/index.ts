const MAIN_MAX_LENGTH = 1920
const THUMBNAIL_MAX_LENGTH = 400

type GetRatioArguments = Record<"height" | "width", number | undefined>

type GetRatioReturn = Record<"mainSize" | "thumbnailSize", Record<"height" | "width", number>>

type GetRatio = (getRatioArguments: GetRatioArguments) => GetRatioReturn

export const getRatio: GetRatio = (getRatioArguments) => {
  const { height, width } = getRatioArguments

  if (!height || !width) throw new Error("Not has rectangle size")

  const isWidthLong = width > height
  const mainRatio = MAIN_MAX_LENGTH / (isWidthLong ? width : height)
  const thumbnailRatio = THUMBNAIL_MAX_LENGTH / (isWidthLong ? width : height)
  const mainSize = {
    height: Math.floor(height * mainRatio),
    width: Math.floor(width * mainRatio),
  } as const
  const thumbnailSize = {
    height: Math.floor(height * thumbnailRatio),
    width: Math.floor(width * thumbnailRatio),
  } as const

  return { mainSize, thumbnailSize }
}
