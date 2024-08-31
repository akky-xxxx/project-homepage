const { Severity } = require("../../../const/Severity/index.cjs")

exports.matchNamesOfFileAndExport = [
  Severity.ERROR,
  {
    captures: [
      // 必要
      /* eslint-disable prefer-named-capture-group */
      /\/components\/(?:atoms|molecules|organisms|templates)\/([^/]+)\/index.tsx$/,
      /\/modules\/([^/]+)\/index.ts/,
      /* eslint-enable prefer-named-capture-group */
    ],
  },
]
