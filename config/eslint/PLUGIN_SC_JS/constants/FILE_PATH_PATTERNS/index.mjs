const tests = [/\/index.test.ts/]
const modules = [/modules\/[a-z][\dA-Za-z]+\/index.ts/]
const styles = [/styles\/.+Style\/index.ts/]
const constants = [/const\/[A-Z][a-zA-Z\d]+\/index.ts/]
const declarations = [/declarations\/[\d@-_a-z]+\/index(?:\.d)?.ts/]
const types = [/types\/[A-Z][\dA-Za-z]+\/index.ts/]

const components1 = [/components\/[A-Z][\dA-Za-z]+\/index\.tsx/]
const components2 = [/components\/(?:icons|atoms|Layout|pages)\/[A-Z][\dA-Za-z]+\/index\.tsx/]
const islands = [/islands\/[A-Z][\dA-Za-z]+\/(?:index|View)\.tsx/]
const components = [...components1, ...components2, ...islands]

const specialRouting = "_404|_error|_renderer"
const page = new RegExp(`app(?:/[^/]+)*/(?:${specialRouting}).tsx`)
const normalRouting = /app\/routes\/(?:(?:\[[a-zA-Z]+]|[a-z\-]+)\/)*index.tsx/
const pages = [page, normalRouting]

const shared = [
  /shared\/utils\/[a-z][\dA-Za-z]+\/index.ts/,
  /shared\/(?:const|styles|types)\/[A-Z][\dA-Za-z]+\/index.ts/,
]

const specials = /app\/(?:client|server)\.ts/

const allowPatterns = [
  tests,
  modules,
  styles,
  constants,
  declarations,
  types,

  components,

  pages,

  shared,

  specials,
].flat()

export const FILE_PATH_PATTERNS = [2, { allowPatterns }]
