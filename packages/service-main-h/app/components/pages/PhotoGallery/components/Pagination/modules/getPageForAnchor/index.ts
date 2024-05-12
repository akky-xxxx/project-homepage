import type { PaginationData } from "@shared/types/PaginationData"

type Props = {
  currentPage: number
  value: Exclude<PaginationData, "ellipsis">
}
type GetPageForAnchor = (props: Props) => number

const SiblingPage = 1

export const getPageForAnchor: GetPageForAnchor = (props) => {
  const { currentPage, value } = props

  if (value === "previous") return currentPage - SiblingPage
  if (value === "next") return currentPage + SiblingPage
  return value
}
