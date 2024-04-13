import { Thumbnail } from "./components/Thumbnail"
import { ulStyle } from "./styles/ulStyle"

import type { FC } from "hono/jsx"
import type { ImagesDataBase } from "module-images-db/src"

type Props = {
  images: typeof ImagesDataBase
}

export const Images: FC<Props> = (props) => {
  const { images } = props

  return (
    <ul className={ulStyle}>
      {images.map((imageInfo) => {
        const { imageId } = imageInfo

        return (
          <li key={imageId}>
            <Thumbnail imageId={imageId} />
          </li>
        )
      })}
    </ul>
  )
}
