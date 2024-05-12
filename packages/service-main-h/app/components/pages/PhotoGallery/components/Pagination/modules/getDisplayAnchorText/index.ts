import type { PaginationData } from "@shared/types/PaginationData"

type Return = number | "<" | ">"
type Value = Exclude<PaginationData, "ellipsis">
type GetDisplayAnchorText = (value: Value) => Return

export const getDisplayAnchorText: GetDisplayAnchorText = (value) => {
  if (value === "previous") return "<"
  if (value === "next") return ">"
  return value
}
