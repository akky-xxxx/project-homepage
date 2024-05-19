module.exports = {
  version: "0.2",
  language: "en",
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
}
