import { EXTENSIONS } from "../../../const/EXTENSIONS"

export const getIdList = (fileList: string[]) => fileList
  .filter((fileName) => !fileName.endsWith(EXTENSIONS.THUMBNAIL))
  .map((fileName) => fileName.replace(/\.avif$/, ""))
