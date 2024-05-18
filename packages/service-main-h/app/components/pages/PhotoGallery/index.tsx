import { css } from "hono/css"

import { Block } from "@atoms/Block"
import { Heading2 } from "@atoms/Heading2"
import { Images } from "@atoms/Images"

import { Conditions } from "./components/Conditions"
import { Pagination } from "./components/Pagination"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { FC } from "hono/jsx"
import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

type Props = {
  currentPage: number
  images: ImagesDataBaseRecord[]
  filterQueries: FilterQueries
  totalPages: number
}

const ONE_PAGE = 1

export const PhotoGallery: FC<Props> = (props) => {
  const { currentPage, images, filterQueries, totalPages } = props

  return (
    <div>
      <Heading2>Photo Gallery</Heading2>

      <Conditions filterQueries={filterQueries} />

      <Block>
        {currentPage} of {totalPages} pages
      </Block>

      <Block>
        <Images filterQueries={filterQueries} images={images} />
      </Block>

      {totalPages > ONE_PAGE && (
        <Block>
          <div class={paginationWrapperStyle}>
            <Pagination
              currentPage={currentPage}
              filterQueries={filterQueries}
              totalPages={totalPages}
            />
          </div>
        </Block>
      )}
    </div>
  )
}

const paginationWrapperStyle = css`
  display: flex;
  place-content: center;
`
