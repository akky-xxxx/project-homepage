import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

export const isIncludesTag = (tag: string) => (record: Pick<ImagesDataBaseRecord, "tags">) => {
  const upperCastedTags: readonly string[] = record.tags
  return tag ? upperCastedTags.includes(tag) : true
}
