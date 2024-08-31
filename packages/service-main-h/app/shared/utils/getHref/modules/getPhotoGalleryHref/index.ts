import type { GetHref } from "@shared/utils/getHref/types/GetHref"

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
type Props = Parameters<GetHref>[0]
type GetPhotoGalleryHref = (props: Props) => string

// eslint-disable-next-line complexity
export const getPhotoGalleryHref: GetPhotoGalleryHref = (props) => {
  if (props.id !== "PhotoGallery") throw new Error("Do not use this function when id is not PhotoGallery.")

  const { date, location, page, tag } = props

  // TODO: filter(Boolean) で型が変わるようになったらリファクタ
  const queries: Array<[string, string[] | number | string]> = []
  if (location != null) queries.push(["location", location])
  if (date != null) queries.push(["date", date])
  if (tag) queries.push(["tag", tag])
  if (page != null) queries.push(["page", page])
  const query = queries.map((keyValue) => keyValue.join("=")).join("&")

  return ["/photo-gallery", query].filter(Boolean).join("?")
}
