import { photoGallery } from "./modules/photoGallery"
import { photoGalleryAreas } from "./modules/photoGalleryAreas"
import { photoGalleryDates } from "./modules/photoGalleryDates"
import { photoGalleryDetail } from "./modules/photoGalleryDetail"
import { photoGalleryTags } from "./modules/photoGalleryTags"

type ApiClient = Record<string, (...inputs: never[]) => Promise<unknown>>

export const apiClient = {
  photoGallery,
  photoGalleryAreas,
  photoGalleryDates,
  photoGalleryDetail,
  photoGalleryTags,
} as const satisfies ApiClient
