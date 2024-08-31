import { isNumber } from "remeda"

import { ImagesPerPage } from "@shared/const/ImagesPerPage"

const FirstPage = 1

export const getPageData = (page: string, allImages: number) => {
  const numberedPage = parseInt(page, 10)
  const currentPage = isNumber(numberedPage) && Number.isFinite(numberedPage) ? numberedPage : FirstPage
  const totalPages = Math.ceil(allImages / ImagesPerPage)

  return { currentPage, totalPages }
}
