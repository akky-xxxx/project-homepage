import { imageStyle } from "./styles/imageStyle"

import type { FC } from "hono/jsx"

const { VITE_IMAGE_HOST: IMAGE_HOST } = import.meta.env

type Props = {
  imageId: string
}

export const Thumbnail: FC<Props> = (props) => {
  const { imageId } = props
  const source = IMAGE_HOST
    ? `${IMAGE_HOST}/${imageId}.thumb.avif`
    : "https://placehold.jp/1980x1320.png"

  return <img alt="" className={imageStyle} src={source} />
}
