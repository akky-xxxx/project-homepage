import fs from "fs"

import type { FilesRecord } from "../../../shared/types/FilesRecord"

export const moveToTemporary = (imageDirectory: string, temporaryDirectory: string) => (record: FilesRecord) => {
  const { extension, fileName, id } = record
  fs.renameSync(
    `${imageDirectory}/${fileName}.${extension}`,
    `${temporaryDirectory}/${fileName}-${id}.${extension}`,
  )
}
