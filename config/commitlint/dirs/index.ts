const { readdirSync, statSync } = require("fs")

const packagesDir = "./packages"
const dir2path = (dir: string) => `${packagesDir}/${dir}`
const isDir = (path: string) => statSync(path).isDirectory()
const path2dir = (path: string) => path.replace(`${packagesDir}/`, "")
const dirs = readdirSync(packagesDir).map(dir2path).filter(isDir).map(path2dir)

exports.dirs = ["root", "*", "packages", ...dirs]
