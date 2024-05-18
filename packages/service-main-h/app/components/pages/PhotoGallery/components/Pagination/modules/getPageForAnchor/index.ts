import type { PaginationData } from "@shared/types/PaginationData"

type Props = {
  currentPage: number
  totalPages: number
  value: Exclude<PaginationData, "ellipsis">
}
type GetPageForAnchor = (props: Props) => number

const SiblingPage = 1
const FirstPage = 1

export const getPageForAnchor: GetPageForAnchor = (props) => {
  const { currentPage, totalPages, value } = props

  if (value === "first") return FirstPage
  if (value === "previous") return currentPage - SiblingPage
  if (value === "next") return currentPage + SiblingPage
  if (value === "last") return totalPages
  return value
}
