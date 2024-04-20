import { Block } from "@atoms/Block"
import { Heading3 } from "@atoms/Heading3"
import { Image } from "@atoms/Image"
import { getHref } from "@shared/utils/getHref"
import { getQueries } from "@shared/utils/getQueries"

import { liStyle } from "./styles/liStyle"
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
        <ul className={ulStyle}>
          {siblingImages.map((imageInfo) => {
            if (!imageInfo) return <li className={liStyle} />
            const { imageId } = imageInfo
            const href = [getHref({ id: "PhotoDetail", imageId }), queries].join("?")

            return (
              <li key={imageId} className={liStyle}>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <a href={href}>
                  <Image isThumbnail imageId={imageId} />
                </a>
              </li>
            )
          })}
        </ul>
      </Block>
    </section>
  )
}
