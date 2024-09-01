const npmScripts = [/src\/[a-z-]+\/index.ts/]
const tests = [/\/index.test.ts/]
const modules = [/modules\/[a-z][\dA-Za-z]+\/index.ts/]
const styles = [/styles\/.+Style\/index.ts/]
const constants = [/const\/[A-Z][\dA-Za-z]+\/index.ts/]
const declarations = [/declarations\/[\d@-_a-z]+\/index(?:\.d)?.ts/]
const regularExpressions = [/regularExpressions\/[a-z][\dA-Za-z]+RegularExpression\/index.ts/]
const schemas = [/schemas\/[A-Z][\dA-Za-z]+Schema\/index.ts/]
const types = [/types\/[A-Z][\dA-Za-z]+\/index.ts/]

const components1 = [/components\/[A-Z][\dA-Za-z]+\/index\.tsx/]
const components2 = [/components\/(?:icons|atoms|Layout|pages)\/[A-Z][\dA-Za-z]+\/index\.tsx/]
const islands = [/islands\/[A-Z][\dA-Za-z]+\/(?:index|View)\.tsx/]
const components = [...components1, ...components2, ...islands]

const specialRouting = "_404|_error|_renderer"
const page = new RegExp(`app(?:/[^/]+)*/(?:${specialRouting}).tsx`)
const normalRouting = /app\/routes\/(?:(?:\[[A-Za-z]+]|[a-z-]+)\/)*index.tsx/
const pages = [page, normalRouting]

const shared = [
  /shared\/utils\/[a-z][\dA-Za-z]+\/index.ts/,
  /shared\/(?:const|styles|types)\/[A-Z][\dA-Za-z]+\/index.ts/,
]

const specials = /app\/(?:client|server)\.ts/

const allowPatterns = [
  npmScripts,

  tests,
  modules,
  styles,
  constants,
  declarations,
  regularExpressions,
  schemas,
  types,

  components,

  pages,

  shared,

  specials,
].flat()

export const FILE_PATH_PATTERNS = [2, { allowPatterns }]
