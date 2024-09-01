module.exports = {
  version: "0.2",

  dictionaries: ["domain", "packages"],
  dictionaryDefinitions: [
    {
      name: "domain",
      path: "./config/cspell/domain.txt",
    },
    {
      name: "packages",
      path: "./config/cspell/packages.txt",
    },
  ],
  ignorePaths: ["./packages/**"],
  language: "en",
}
