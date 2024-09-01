import { EXTENSIONS } from "../const/EXTENSIONS"
import { Images } from "../const/Images"
import { getFileList } from "../shared/utils/getFileList"
import { getIdList } from "../shared/utils/getIdList"
import { storageBucket } from "../shared/utils/storageBucket"

const ImageSet = new Set<string>(Images)

const deleteImage = async () => {
  const idList = getIdList(await getFileList())
  const deleteTargetList = idList
    .filter((id) => !ImageSet.has(id))
    .flatMap((deleteId) => [`${deleteId}${EXTENSIONS.THUMBNAIL}`, `${deleteId}${EXTENSIONS.MAIN}`])
  await Promise.all(deleteTargetList.map((deleteId) => storageBucket.file(deleteId).delete()))
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
deleteImage()
