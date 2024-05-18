import { css, cx } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"
import { getHref } from "@shared/utils/getHref"

import { getDisplayAnchorText } from "./modules/getDisplayAnchorText"
import { getPageForAnchor } from "./modules/getPageForAnchor"
import { getPaginationData } from "./modules/getPaginationData"
import { getShowClass } from "./modules/getShowClass"

import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"
import type { FC } from "hono/jsx"

const { SPACE12, SPACE16 } = Spaces

type Props = {
  currentPage: number
  searchQueries: PhotoGallerySearchQueries
  totalPages: number
}

export const Pagination: FC<Props> = (props) => {
  const { currentPage, searchQueries, totalPages } = props
  const paginationData = getPaginationData({ currentPage, totalPages })

  return (
    <div class={rootStyle}>
      {paginationData.map((value) => {
        const showClass = getShowClass(value)
        if (value === "ellipsis" || value === currentPage) {
          const displayText = value === "ellipsis" ? "..." : value
          return <span className={cx(itemStyle, showClass)}>{displayText}</span>
        }

        const page = getPageForAnchor({ currentPage, value })
        const href = getHref({
          id: "PhotoGallery",
          page,
          ...searchQueries,
        })

        return (
          <a className={cx(itemStyle, anchorStyle, showClass)} href={href}>
            {getDisplayAnchorText(value)}
          </a>
        )
      })}
    </div>
  )
}

const rootStyle = css`
  display: flex;
  column-gap: ${SPACE12}rem;
`

const itemStyle = css`
  padding: ${SPACE12}rem ${SPACE16}rem;
  border: 1px solid transparent;
`

const anchorStyle = css`
  border: 1px solid var(--primary-color);
  text-decoration: none;

  &:visited {
    color: var(--primary-color);
  }
`
