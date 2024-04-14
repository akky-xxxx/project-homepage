import { Block } from "@atoms/Block"
import { Heading2 } from "@atoms/Heading2"
import { Images } from "@atoms/Images"

import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type Props = {
  images: ImagesDataBaseRecord[]
}

export const PhotoGallery: FC<Props> = (props) => {
  const { images } = props

  return (
    <div>
      <Heading2>Photo Gallery</Heading2>

      <Block>
        <Images images={images} />
      </Block>
    </div>
  )
}
