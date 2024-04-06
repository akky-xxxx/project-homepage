import { v4 } from "uuid"

import { imageExtensionRegularExpression } from "../../regularExpressions/imageExtensionRegularExpression"

import type { FilesRecord } from "../../../shared/types/FilesRecord"

export const getFilePaths = (files: string[]): FilesRecord[] =>
  files
    .filter((fileName) => imageExtensionRegularExpression.test(fileName))
    .map((originFileName) => {
      const result = originFileName.match(/^(.+)\.(jpe?g|png|gif|webp)$/i)

      if (!result) throw new Error("Not found image file(extension).")

      const [, fileName = "", extension = ""] = result

      return {
        extension,
        fileName,
        id: v4(),
      }
    })
