import fs from "fs"
import path from "path"

import { createImageConstant } from "./modules/createImageConstant"
import { getFilePaths } from "./modules/getFilePaths"
import { moveToTemporary } from "./modules/moveToTemporary"
import { optimizeImage } from "./modules/optimizeImage"
import { upload } from "./modules/upload"

const ServiceName = "module-images-db"
const FirstCharacter = 0
const RootDirectory = __dirname.slice(
  FirstCharacter,
  __dirname.indexOf(ServiceName) + ServiceName.length,
)
const ImageDirectory = path.resolve(RootDirectory, "origin-image")
const TemporaryDirectory = path.resolve(RootDirectory, ".temporary-image")

if (!fs.existsSync(TemporaryDirectory)) fs.mkdirSync(TemporaryDirectory)

const filePaths = getFilePaths(fs.readdirSync(ImageDirectory))

const NotExistArray = 0
if (filePaths.length === NotExistArray) throw new Error("Not exist image file in `image directory`")

filePaths.forEach(moveToTemporary(ImageDirectory, TemporaryDirectory))

const uploadImage = async () => {
  await Promise.all(filePaths.map(optimizeImage(TemporaryDirectory)))
  /* eslint-disable no-console */
  console.log("Optimized image files")
  await Promise.all(filePaths.map(upload(TemporaryDirectory)))
  console.log("Uploaded image files")
  await createImageConstant()
  console.log("Created constant file")
  fs.rmSync(TemporaryDirectory, {
    force: true,
    recursive: true,
  })
  console.log("Deleted temporary directory")
  /* eslint-enable no-console */
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
uploadImage()
