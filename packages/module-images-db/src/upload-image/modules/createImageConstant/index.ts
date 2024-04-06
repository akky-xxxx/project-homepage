import fs from "fs"
import path from "path"

import { getFileList } from "../../../shared/utils/getFileList"
import { getIdList } from "../../../shared/utils/getIdList"

const ServiceName = "module-images-db"
const FirstCharacter = 0
const ConstantDirectory = path.resolve(
  __dirname.slice(FirstCharacter, __dirname.indexOf(ServiceName) + ServiceName.length),
  "src/const/Images",
)

type CreateImageConstant = () => Promise<void>

export const createImageConstant: CreateImageConstant = async () => {
  const idList = getIdList(await getFileList()).map((id) => `"${id}"`)

  const source = `export const Images = [${idList.join(",")}] as const`
  fs.writeFileSync(`${ConstantDirectory}/index.ts`, source)
}
