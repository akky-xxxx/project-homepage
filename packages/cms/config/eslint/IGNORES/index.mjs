export const IGNORES = {
  ignores: [
    ".next",
    "next-env.d.ts",
    "playwright-report",
    // src/app/(payload) 配下は Payload が生成し再生成で上書きされるため対象外にする
    // ("GENERATED AUTOMATICALLY BY PAYLOAD" ヘッダが付く)
    "src/app/(payload)/**",
    // payload migrate:create が生成するため対象外にする
    "src/migrations/**",
    "src/payload-generated-schema.ts",
    "test-results",
  ],
}
