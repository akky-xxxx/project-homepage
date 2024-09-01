import fs from "fs"
import path from "path"

import { getFileList } from "../../../shared/utils/getFileList"
import { getIdList } from "../../../shared/utils/getIdList"

const SERVICE_NAME = "module-images-db"
const FIRST_CHARACTER = 0
const CONSTANT_DIRECTORY = path.resolve(
  __dirname.slice(FIRST_CHARACTER, __dirname.indexOf(SERVICE_NAME) + SERVICE_NAME.length),
  "src/const/Images",
)

type CreateImageConstant = () => Promise<void>

export const createImageConstant: CreateImageConstant = async () => {
  const idList = getIdList(await getFileList()).map((id) => `"${id}"`)

  const source = `export const Images = [${idList.join(",")}] as const`
  fs.writeFileSync(`${CONSTANT_DIRECTORY}/index.ts`, source)
}
