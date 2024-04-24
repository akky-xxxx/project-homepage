import { Block } from "@atoms/Block"
import { ContentsWidthBlock } from "@atoms/ContentsWidthBlock"
import { Heading3 } from "@atoms/Heading3"
import { Image } from "@atoms/Image"
import { PhotoGallerySitemap } from "@atoms/PhotoGallerySitemap"
import { thumbnailStyle } from "@shared/styles/thumbnailStyle"
import { getHref } from "@shared/utils/getHref"
import { getPhotoText } from "@shared/utils/getPhotoText"
import { getQueries } from "@shared/utils/getQueries"

import { ulStyle } from "./styles/ulStyle"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type Props = {
  filterQueries?: FilterQueries
  images: ImagesDataBaseRecord[]
}

export const Images: FC<Props> = (props) => {
  const { filterQueries, images } = props

  if (!images.length)
    return (
      <section>
        <Heading3>Not found image</Heading3>
        <Block>
          <ContentsWidthBlock>
            <p>Please search other conditions.</p>
          </ContentsWidthBlock>
        </Block>

        <section>
          <Block>
            <ContentsWidthBlock>
              <PhotoGallerySitemap />
            </ContentsWidthBlock>
          </Block>
        </section>
      </section>
    )

  return (
    <ul class={ulStyle}>
      {images.map((imageInfo) => {
        const { imageId } = imageInfo
        const href = [getHref({ id: "PhotoDetail", imageId }), getQueries(filterQueries)]
          .filter(Boolean)
          .join("?")
        const alt = getPhotoText(imageInfo)

        return (
          <li key={imageId}>
            <a href={href}>
              <Image isThumbnail alt={alt} className={thumbnailStyle} imageId={imageId} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
