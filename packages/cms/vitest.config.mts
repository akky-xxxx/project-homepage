import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],

    include: ["tests/int/**/*.int.spec.ts"],

    // 全ファイルが同じ Postgres を共有し、users の件数に依存するテストもあるため直列実行する
    fileParallelism: false,
  },
})
