export const IGNORES = {
  ignores: [
    ".next",
    "next-env.d.ts",
    "playwright-report",
    // src/app/(payload) 配下は Payload が生成し再生成で上書きされるため対象外にする
    // ("GENERATED AUTOMATICALLY BY PAYLOAD" ヘッダが付く)
    "src/app/(payload)/**",
    "src/payload-generated-schema.ts",
    "src/payload-types.ts",
    "test-results",
  ],
}
