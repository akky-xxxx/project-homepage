// Payload のエントリ
const payload = [/src\/payload\.config\.ts/]

const collections = [/collections\/[A-Z][\dA-Za-z]+\/index\.ts/]
const components = [/components\/[A-Z][\dA-Za-z]+\/index\.tsx/]
const types = [/types\/[A-Z][\dA-Za-z]+\/index\.ts/]

const shared = [
  /shared\/utilities\/[a-z][\dA-Za-z]+\/index\.ts/,
  /shared\/const\/[A-Z][\dA-Za-z_]+\/index\.ts/,
  /shared\/schemas\/[A-Z][\dA-Za-z]+Schema\/index\.ts/,
]

const tests = [
  /tests\/(?:e2e|int)\/[\dA-Za-z]+\.(?:e2e|int)\.spec\.ts/,
  /tests\/helpers\/[a-z][\dA-Za-z]+\/index\.ts/,
]

const allowPatterns = [payload, collections, components, types, shared, tests].flat()

export const FILE_PATH_PATTERNS = [2, { allowPatterns }]
