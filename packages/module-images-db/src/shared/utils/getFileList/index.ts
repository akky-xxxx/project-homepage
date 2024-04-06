import { storageBucket } from "../storageBucket"

type GetFileList = () => Promise<string[]>

export const getFileList: GetFileList = async () => {
  const [files] = await storageBucket.getFiles()
  return files.map((file) => file.name)
}
