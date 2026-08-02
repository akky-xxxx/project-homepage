import { EnvironmentSchema } from "@/shared/schemas/EnvironmentSchema"

// 環境変数の読み取り口はこの 1 箇所に閉じる
// eslint-disable-next-line sc-js/restrict-use-of-process-env
export const ENVIRONMENT = EnvironmentSchema.parse(process.env)
