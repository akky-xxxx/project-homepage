import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

const { VITE_IMAGE_HOST: IMAGE_HOST } = import.meta.env

const Placeholder = "https://placehold.jp/1980x1320.png"

type Props = Pick<ImagesDataBaseRecord, "imageId"> & {
  alt?: string
  className?: Promise<string> | string
  isThumbnail?: boolean
}

export const Image: FC<Props> = (props) => {
  const { alt = "", className, imageId, isThumbnail } = props
  const extension = isThumbnail ? ".thumb.avif" : ".avif"
  const source = IMAGE_HOST ? `${IMAGE_HOST}/${imageId}${extension}` : Placeholder

  return <img alt={alt} class={className} decoding="async" src={source} />
}
