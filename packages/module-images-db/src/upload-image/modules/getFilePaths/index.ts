import { v4 } from "uuid"
import { z } from "zod"

import type { FilesRecord } from "../../../shared/types/FilesRecord"

const EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"].map((extension) => `.${extension}`)

const execSchema = z.object({
  extension: z.string(),
  fileName: z.string(),
})

export const getFilePaths = (files: string[]): FilesRecord[] => files
  .filter((fileName) => EXTENSIONS.some((extension) => fileName.toLowerCase().endsWith(extension)))
  .map((originFileName) => {
    const result = execSchema.safeParse(
      /^(?<fileName>.+)\.(?<extension>jpe?g|png|gif|webp)$/.exec(originFileName.toLowerCase())?.groups,
    )

    if (!result.success) throw new Error("Not found image file(extension).")

    const {
      data: { extension, fileName },
    } = result

    return {
      extension,
      fileName,
      id: v4(),
    }
  })
