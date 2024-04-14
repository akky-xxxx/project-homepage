import type { PhotoGalleryFilterKey } from "@shared/types/PhotoGalleryFilterKey"

type Props =
  | {
      id: "PhotoDetail"
      imageId: string
    }
  | {
      id: "PhotoGallery"
    }
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
