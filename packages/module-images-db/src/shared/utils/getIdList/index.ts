import { Extensions } from "../../../const/Extensions"

export const getIdList = (fileList: string[]) => fileList
  .filter((fileName) => !fileName.endsWith(Extensions.THUMBNAIL))
  .map((fileName) => fileName.replace(/\.avif$/, ""))
