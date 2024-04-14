import { Heading2 } from "@atoms/Heading2"
import { Block } from "app/components/atoms/Block"
import { Image } from "app/components/atoms/Image"

import { ImageInfo } from "./components/ImageInfo"

import type { FC } from "hono/jsx"
import type { ImagesDataBase } from "module-images-db/src"

type Props = (typeof ImagesDataBase)[number]

export const Photo: FC<Props> = (props) => {
  const { area, date, imageId, tags } = props
  return (
    <div>
      <Heading2>Photo</Heading2>

      <Block>
        <Image imageId={imageId} />
      </Block>

      <Block>
        <ImageInfo area={area} date={date} tags={tags} />
      </Block>
    </div>
  )
}