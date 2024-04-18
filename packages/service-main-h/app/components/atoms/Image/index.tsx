import { imageStyle } from "./styles/imageStyle"
import { thumbnailStyle } from "./styles/thumbnailStyle"

import type { FC } from "hono/jsx"
import type { ImagesDataBase } from "module-images-db/src"

const { VITE_IMAGE_HOST: IMAGE_HOST } = import.meta.env

const Placeholder = "https://placehold.jp/1980x1320.png"

type Props = Pick<(typeof ImagesDataBase)[number], "imageId"> & {
  isThumbnail?: boolean
}

export const Image: FC<Props> = (props) => {
  const { imageId, isThumbnail } = props
  const extension = isThumbnail ? ".thumb.avif" : ".avif"
  const style = isThumbnail ? thumbnailStyle : imageStyle
  const source = IMAGE_HOST ? `${IMAGE_HOST}/${imageId}${extension}` : Placeholder

  return <img alt="" className={style} decoding="async" src={source} />
}
