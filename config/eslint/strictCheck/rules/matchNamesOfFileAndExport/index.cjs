const { Severity } = require("../../../const/Severity/index.cjs")

exports.matchNamesOfFileAndExport = [
  Severity.ERROR,
  {
    captures: [
      /\/components\/(?:atoms|molecules|organisms|templates)\/([^/]+)\/index.tsx$/,
      /\/modules\/([^/]+)\/index.ts/,
    ],
  },
]
