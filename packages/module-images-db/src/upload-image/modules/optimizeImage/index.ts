import sharp from "sharp"

import { getRatio } from "./modules/getRatio"
import { Extensions } from "../../../const/Extensions"

import type { FilesRecord } from "../../../shared/types/FilesRecord"

type OptimizeImage = (temporaryDirectory: string) => (record: FilesRecord) => void
export const optimizeImage: OptimizeImage = (temporaryDirectory) => async (record) => {
  const { extension, fileName, id } = record
  const commonName = `${fileName}-${id}`
  const originFullPath = `${temporaryDirectory}/${commonName}.${extension}`
  const temporaryFullPath = `${temporaryDirectory}/${commonName}${Extensions.MAIN}`
  const temporaryThumbnailFullPath = `${temporaryDirectory}/${commonName}${Extensions.THUMBNAIL}`
  const meta = await sharp(originFullPath).metadata()

  const { mainSize, thumbnailSize } = getRatio({
    height: meta.height,
    width: meta.width,
  })

  await Promise.all([
    sharp(originFullPath).resize(thumbnailSize).avif().toFile(temporaryThumbnailFullPath),
    sharp(originFullPath).resize(mainSize).toFile(temporaryFullPath),
  ])
}
