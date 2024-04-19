import { Heading2 } from "@atoms/Heading2"
import { Block } from "app/components/atoms/Block"
import { Image } from "app/components/atoms/Image"

import { ImageInfo } from "./components/ImageInfo"
import { SiblingImages } from "./components/SiblingImages"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type OptionalImageInfo = ImagesDataBaseRecord | undefined

type Props = ImagesDataBaseRecord & {
  filterQueries?: FilterQueries
  siblingImages: [OptionalImageInfo, OptionalImageInfo]
}

export const PhotoDetail: FC<Props> = (props) => {
  const { area, date, filterQueries, imageId, siblingImages, tags } = props
  return (
    <div>
      <Heading2>Photo</Heading2>

      <Block>
        <Image imageId={imageId} />
      </Block>

      <Block>
        <ImageInfo area={area} date={date} tags={tags} />
      </Block>

      <SiblingImages filterQueries={filterQueries} siblingImages={siblingImages} />
    </div>
  )
}
