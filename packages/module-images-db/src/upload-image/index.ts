import fs from "fs"
import path from "path"

import { createImageConstant } from "./modules/createImageConstant"
import { getFilePaths } from "./modules/getFilePaths"
import { moveToTemporary } from "./modules/moveToTemporary"
import { optimizeImage } from "./modules/optimizeImage"
import { upload } from "./modules/upload"

const SERVICE_NAME = "module-images-db"
const FIRST_CHARACTER = 0
const ROOT_DIRECTORY = __dirname.slice(
  FIRST_CHARACTER,
  __dirname.indexOf(SERVICE_NAME) + SERVICE_NAME.length,
)
const IMAGE_DIRECTORY = path.resolve(ROOT_DIRECTORY, "origin-image")
const TEMPORARY_DIRECTORY = path.resolve(ROOT_DIRECTORY, ".temporary-image")

if (!fs.existsSync(TEMPORARY_DIRECTORY)) fs.mkdirSync(TEMPORARY_DIRECTORY)

const filePaths = getFilePaths(fs.readdirSync(IMAGE_DIRECTORY))

const NOT_EXIST_ARRAY = 0
if (filePaths.length === NOT_EXIST_ARRAY) throw new Error("Not exist image file in `image directory`")

filePaths.forEach(moveToTemporary(IMAGE_DIRECTORY, TEMPORARY_DIRECTORY))

const uploadImage = async () => {
  /* eslint-disable sonarjs/todo-tag */
  // TODO: allow function にして挙動が変わらないか確認する
  // eslint-disable-next-line sonarjs/array-callback-without-return
  await Promise.all(filePaths.map(optimizeImage(TEMPORARY_DIRECTORY)))
  /* eslint-disable no-console */
  console.log("Optimized image files")
  await Promise.all(filePaths.map(upload(TEMPORARY_DIRECTORY)))
  console.log("Uploaded image files")
  await createImageConstant()
  console.log("Created constant file")
  fs.rmSync(TEMPORARY_DIRECTORY, {
    force: true,
    recursive: true,
  })
  console.log("Deleted temporary directory")
  /* eslint-enable no-console */
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
uploadImage()
