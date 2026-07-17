import type { PaginationData } from "@shared/types/PaginationData"

type Return = number | "<" | "<<" | ">" | ">>"
type Value = Exclude<PaginationData, "ellipsis">
type GetDisplayAnchorText = (value: Value) => Return

// eslint-disable-next-line sonarjs/function-return-type -- ページ番号はそのまま数値、first/previous/next/last は矢印記号の文字列を返す意図的な仕様
export const getDisplayAnchorText: GetDisplayAnchorText = (value) => {
  if (value === "first") return "<<"
  if (value === "previous") return "<"
  if (value === "next") return ">"
  if (value === "last") return ">>"
  return value
}
