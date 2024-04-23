type SortTarget = {
  area: string
  date: string
  imageId: string
}

/* eslint-disable @typescript-eslint/no-magic-numbers */
// eslint-disable-next-line complexity
export const sortImageDataBase = (a: SortTarget, b: SortTarget) => {
  const aDate = new Date(a.date)
  const bDate = new Date(b.date)

  if (aDate > bDate) return -1
  if (aDate < bDate) return 1

  const { area: aArea, imageId: aId } = a
  const { area: bArea, imageId: bId } = b

  if (!aId || !bId) throw new Error("Not captured")

  if (aId > bId) return 1
  if (aId < bId) return -1

  return aArea > bArea ? 1 : -1
}
