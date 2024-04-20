module.exports = {
  version: "0.2",
  language: "en",
  ignorePaths: ["**/libs/**"],
  dictionaries: ["app", "colors", "packages", "web"],
  dictionaryDefinitions: [
    {
      name: "app",
      path: "./config/cspell/app.txt",
    },
    {
      name: "colors",
      path: "./config/cspell/colors.txt",
    },
    {
      name: "packages",
      path: "./config/cspell/packages.txt",
    },
    {
      name: "web",
      path: "./config/cspell/web.txt",
    },
  ],
}
