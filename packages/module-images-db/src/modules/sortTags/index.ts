export const sortTags = <T extends { tags: string[] }>(record: T) => ({
  ...record,
  tags: [...new Set(record.tags)].sort(),
})
