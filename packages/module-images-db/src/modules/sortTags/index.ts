export const sortTags = <T extends { tags: string[] }>(record: T) => ({
  ...record,
  tags: [...record.tags].sort(),
})
