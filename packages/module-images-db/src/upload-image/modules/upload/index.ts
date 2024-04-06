import { Extensions } from "../../../const/Extensions"
import { storageBucket } from "../../../shared/utils/storageBucket"

import type { FilesRecord } from "../../../shared/types/FilesRecord"

type Upload = (temporaryDirectory: string) => (record: FilesRecord) => Promise<void>

export const upload: Upload = (temporaryDirectory) => async (record) => {
  const { fileName, id } = record

  const commonName = `${fileName}-${id}`
  const mainName = `${commonName}${Extensions.MAIN}`
  const thumbNailName = `${commonName}${Extensions.THUMBNAIL}`
  const temporaryFullPath = `${temporaryDirectory}/${mainName}`
  const temporaryThumbnailFullPath = `${temporaryDirectory}/${thumbNailName}`

  await Promise.all([
    storageBucket.upload(temporaryFullPath),
    storageBucket.upload(temporaryThumbnailFullPath),
  ])
  await Promise.all([
    /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/ban-ts-comment */
    // @ts-expect-error
    storageBucket.file(mainName).acl.owners.addAllUsers(),
    // @ts-expect-error
    storageBucket.file(thumbNailName).acl.owners.addAllUsers(),
    /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/ban-ts-comment */
  ])
}
