import { css } from "hono/css"

import type { FC } from "hono/jsx"
import type { ImagesDataBase } from "module-images-db/src"

const { VITE_IMAGE_HOST: IMAGE_HOST } = import.meta.env

type Props = Pick<(typeof ImagesDataBase)[number], "imageId">

export const Image: FC<Props> = (props) => {
  const { imageId } = props
  const source = IMAGE_HOST ? `${IMAGE_HOST}/${imageId}.avif` : "https://placehold.jp/1980x1320.png"

  return <img alt="" className={imageStyle} decoding="async" src={source} />
}

const imageStyle = css`
  margin-inline: auto;
  max-height: calc(100dvh - 130px);
`
