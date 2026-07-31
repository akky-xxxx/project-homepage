import type { PhotoGallerySearchQueries } from "@shared/types/PhotoGallerySearchQueries"

type Props =
  {
    id: "About"
  } | {
    id: "PhotoDetail"
    imageId: string
  } | {
    id: "Profile"
  } | {
    id: "Search"
  } | PhotoGallerySearchQueries & {
    id: "PhotoGallery"
    page?: number
  } | Pick<Required<PhotoGallerySearchQueries>, "date"> & {
    id: "PhotoDateDetail"
  } | Pick<Required<PhotoGallerySearchQueries>, "location"> & {
    id: "PhotoLocationDetail"
  } | Pick<Required<PhotoGallerySearchQueries>, "tag"> & {
    id: "PhotoTagDetail"
  }

export type GetHref = (props: Props) => string
