import { Block } from "@atoms/Block"
import { Heading3 } from "@atoms/Heading3"
import { Image } from "@atoms/Image"
import { thumbnailStyle } from "@shared/styles/thumbnailStyle"
import { getHref } from "@shared/utils/getHref"
import { getPhotoText } from "@shared/utils/getPhotoText"
import { getQueries } from "@shared/utils/getQueries"

import { ulStyle } from "./styles/ulStyle"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type OptionalImageInfo = ImagesDataBaseRecord | undefined

type Props = {
  filterQueries?: FilterQueries
  siblingImages: [OptionalImageInfo, OptionalImageInfo]
}

export const SiblingImages: FC<Props> = (props) => {
  const { filterQueries, siblingImages } = props

  // TODO: early return に適した値が型上ないための回避策
  // eslint-disable-next-line react/jsx-fragments, react/jsx-no-useless-fragment
  if (!siblingImages.filter(Boolean).length) return <></>
  const queries = getQueries(filterQueries)
  const heading3Text = queries ? "Related" : "Others"

  return (
    <section>
      <Block>
        <Heading3>{heading3Text}</Heading3>
      </Block>
      <Block>
        <ul class={ulStyle}>
          {siblingImages.map((imageInfo) => {
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
