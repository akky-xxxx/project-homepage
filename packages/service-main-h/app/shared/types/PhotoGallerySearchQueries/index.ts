import type { PhotoGallerySearchKey } from "app/shared/types/PhotoGallerySearchKey"

type StringQuery = Record<Extract<PhotoGallerySearchKey, "date" | "location">, string>
type StringArrayQuery = Record<Extract<PhotoGallerySearchKey, "tag">, string[]>

export type PhotoGallerySearchQueries = Partial<StringArrayQuery & StringQuery>
