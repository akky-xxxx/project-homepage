# test

- `describe` / `it` のメッセージは日本語で記述する
- カバレッジ75%を目指す
- 対象に応じてブラックボックステストとホワイトボックステストを使い分ける
  - 公開された interface(props / DOM / 公開 API 等)を通して振る舞いを検証する対象: ブラックボックステスト。内部実装(state 変数名や内部関数など)には依存しない
  - 内部状態やロジックの分岐を直接検証してカバレッジを担保すべき対象(hook、utility、内部モジュール等): ホワイトボックステスト

## テストファイルの配置

- `main` / `module-images-db`: テスト対象の `index.ts` の隣に `index.test.ts` を置く(co-location)。`bun:test` で書く
- `cms`: 結合テストは `tests/int/**/*.int.spec.ts`(Vitest)、E2E は `tests/e2e/**/*.e2e.spec.ts`(Playwright)に置く

## bun:test のモジュールモック(`main` / `module-images-db`)

- `mock.module` の差し替えはファイル単位ではなくプロセス全体のモジュールレジストリに効く。あるテストファイルでの差し替えは、同じプロセスで実行される他のテストファイルにも残る
- 特に「別のテストファイルがテスト対象にしているモジュール」を `mock.module` で差し替えると、実行順によって結果が変わる。ローカルでは通るのに CI で落ちる(あるいはその逆)という形で表面化し、再現が難しい
  - 実例: `upload-image/modules/createImageConstant/index.test.ts` が `shared/utils/getFileList` を差し替え、そのモジュールをテスト対象にしている `shared/utils/getFileList/index.test.ts` が CI で落ちた
- 現状は各パッケージの `test` script に `--isolate` を付け、テストファイルごとに独立したモジュールレジストリで実行することで分離している。ただし分離に頼り切らず、以下を優先する
  - 依存を引数で受け取れる(testable な)設計にして、そもそも `mock.module` を使わずに済ませられないか先に検討する
  - 差し替えるのは、テスト対象が直接依存する外部モジュール(`sharp`、`@google-cloud/storage` 等)に留める
