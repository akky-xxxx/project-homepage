import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

export const isStartsWithDate = (date: string) => (record: ImagesDataBaseRecord) => (
  date ? record.date.startsWith(date) : true
)
