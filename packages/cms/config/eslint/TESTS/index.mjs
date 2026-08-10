/* eslint-disable import/no-relative-packages */
import { Severity } from "../../../../../config/eslint/const/Severity/index.mjs"

export const TESTS = [
  {
    files: ["tests/**/*.ts"],
    rules: {
      // Playwright の `await expect(locator)` やヘルパー内の assertion を
      // sonarjs が検出できず、常に誤検知するため
      "sonarjs/assertions-in-tests": Severity.OFF,

      // e2e / int といったテスト種別の略語はファイル名の規約として使う
      "unicorn/prevent-abbreviations": Severity.OFF,

      // 準備・実行・検証を 1 つのテストに素直に並べると超えるため
      "max-statements": Severity.OFF,

      // describe / it のコールバックも関数として数えられるため、
      // テストケースを増やすだけで頭打ちになる
      "max-lines": Severity.OFF,
      "max-lines-per-function": Severity.OFF,

      // テストユーザーの認証情報はフィクスチャとして直接書く必要があるため
      "sonarjs/no-hardcoded-passwords": Severity.OFF,
    },
  },
]
