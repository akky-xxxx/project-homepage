import type { PhotoGallerySearchQueries } from "@shared/types/PhotoGallerySearchQueries"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

export const isIncludesTag =
  (tags: Required<PhotoGallerySearchQueries>["tag"]) =>
  (record: Pick<ImagesDataBaseRecord, "tags">) => {
    if (!tags.length) return true
    const upperCastedTags: readonly string[] = record.tags
    return tags.every((tag) => upperCastedTags.includes(tag))
  }
