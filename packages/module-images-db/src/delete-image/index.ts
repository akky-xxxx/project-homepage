import { EXTENSIONS } from "../const/EXTENSIONS"
import { IMAGES } from "../const/IMAGES"
import { getFileList } from "../shared/utils/getFileList"
import { getIdList } from "../shared/utils/getIdList"
import { storageBucket } from "../shared/utils/storageBucket"

const IMAGE_SET = new Set<string>(IMAGES)

const deleteImage = async () => {
  const idList = getIdList(await getFileList())
  const deleteTargetList = idList
    .filter((id) => !IMAGE_SET.has(id))
    .flatMap((deleteId) => [`${deleteId}${EXTENSIONS.THUMBNAIL}`, `${deleteId}${EXTENSIONS.MAIN}`])
  await Promise.all(deleteTargetList.map((deleteId) => storageBucket.file(deleteId).delete()))
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
deleteImage()
