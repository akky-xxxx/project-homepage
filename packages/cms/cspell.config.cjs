module.exports = {
  version: "0.2",

  // payload migrate:create が生成するため対象外にする
  ignorePaths: ["src/migrations/**"],

  dictionaries: ["app", "packages"],
  dictionaryDefinitions: [
    {
      name: "app",
      path: "./config/cspell/app.txt",
    },
    {
      name: "packages",
      path: "./config/cspell/packages.txt",
    },
  ],
  language: "en",
}
