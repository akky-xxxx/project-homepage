/* eslint-disable import/no-relative-packages */
import { Severity } from "../../../../../config/eslint/const/Severity/index.mjs"

export const PAYLOAD_CONFIG = [
  {
    files: ["src/payload.config.ts"],
    rules: {
      // Payload のエントリは default export が規約
      "import/no-default-export": Severity.OFF,

      // 宣言的な設定オブジェクト 1 つで構成されるファイルのため、
      // 分割してもファイルをまたぐだけで見通しが良くならない
      "max-lines": Severity.OFF,
    },
  },
]
