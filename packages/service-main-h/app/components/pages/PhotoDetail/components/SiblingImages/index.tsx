import { Block } from "@atoms/Block"
import { Heading3 } from "@atoms/Heading3"
import { Image } from "@atoms/Image"
import { thumbnailStyle } from "@shared/styles/thumbnailStyle"
import { getHref } from "@shared/utils/getHref"
import { getPhotoText } from "@shared/utils/getPhotoText"
import { getQueries } from "@shared/utils/getQueries"

import { ulStyle } from "./styles/ulStyle"

import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"
import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type OptionalImageInfo = ImagesDataBaseRecord | undefined

type Props = {
  searchQueries?: PhotoGallerySearchQueries
  siblingImages: [OptionalImageInfo, OptionalImageInfo]
}

export const SiblingImages: FC<Props> = (props) => {
  const { searchQueries, siblingImages } = props

  // TODO: early return に適した値が型上ないための回避策
  // eslint-disable-next-line react/jsx-fragments, react/jsx-no-useless-fragment
  if (!siblingImages.filter(Boolean).length) return <></>
  const queries = getQueries(searchQueries)
  const heading3Text = queries ? "Related" : "Others"

  return (
    <section>
      <Block>
        <Heading3>{heading3Text}</Heading3>
      </Block>
      <Block>
        <ul class={ulStyle}>
          {siblingImages.map((imageInfo) => {
            // key の指定は不要
            // eslint-disable-next-line react/jsx-key
            if (!imageInfo) return <li />
            const { imageId } = imageInfo
            const href = [getHref({ id: "PhotoDetail", imageId }), queries].join("?")
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
      </Block>
    </section>
  )
}
