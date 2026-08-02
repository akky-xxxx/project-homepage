import type { ImagesDataBaseRecord } from "module-images-db/src/types/ImagesDataBaseRecord"

export const isSameLocation = (location: string) => (record: ImagesDataBaseRecord) =>
  location ? record.area === location : true
