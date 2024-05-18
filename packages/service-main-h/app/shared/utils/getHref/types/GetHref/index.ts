import type { PhotoGallerySearchKey } from "app/shared/types/PhotoGallerySearchKey"

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
  | (Partial<Record<PhotoGallerySearchKey, string>> & {
      id: "PhotoGallery"
      page?: number
    })
  | (Record<Extract<PhotoGallerySearchKey, "date">, string> & {
      id: "PhotoDateDetail"
    })
  | (Record<Extract<PhotoGallerySearchKey, "location">, string> & {
      id: "PhotoLocationDetail"
    })
  | (Record<Extract<PhotoGallerySearchKey, "tag">, string> & {
      id: "PhotoTagDetail"
    })

export type GetHref = (props: Props) => string
