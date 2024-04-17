import { Block } from "@atoms/Block"
import { Heading2 } from "@atoms/Heading2"
import { Images } from "@atoms/Images"

import { Conditions } from "./components/Conditions"

import type { PhotoGalleryFilterKey } from "@shared/types/PhotoGalleryFilterKey"
import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type Props = {
  images: ImagesDataBaseRecord[]
  filterQueries: Partial<Record<PhotoGalleryFilterKey, string>>
}

export const PhotoGallery: FC<Props> = (props) => {
  const { images, filterQueries } = props

  return (
    <div>
      <Heading2>Photo Gallery</Heading2>

      <Conditions filterQueries={filterQueries} />

      <Block>
        <Images images={images} />
      </Block>
    </div>
  )
}
