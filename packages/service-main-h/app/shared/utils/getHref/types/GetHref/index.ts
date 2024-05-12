import type { PhotoGalleryFilterKey } from "@shared/types/PhotoGalleryFilterKey"

type Props =
  | {
      id: "About"
    }
  | {
      id: "PhotoDetail"
      imageId: string
    }
  | {
      id: "Profile"
    }
  | (Partial<Record<PhotoGalleryFilterKey, string>> & {
      id: "PhotoGallery"
      page?: number
    })
  | (Record<Extract<PhotoGalleryFilterKey, "date">, string> & {
      id: "PhotoDateDetail"
    })
  | (Record<Extract<PhotoGalleryFilterKey, "location">, string> & {
      id: "PhotoLocationDetail"
    })
  | (Record<Extract<PhotoGalleryFilterKey, "tag">, string> & {
      id: "PhotoTagDetail"
    })

export type GetHref = (props: Props) => string
