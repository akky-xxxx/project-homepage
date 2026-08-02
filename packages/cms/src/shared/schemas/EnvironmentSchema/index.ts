import { z } from "zod"

import { isProductionDatabase } from "@/shared/utilities/isProductionDatabase"

// 32 文字は `openssl rand -base64 32` 相当。これを下回る secret は署名鍵として弱すぎるため弾く
const MINIMUM_SECRET_LENGTH = 32

const NON_EMPTY = 1

export const EnvironmentSchema = z
  .object({
    BETTER_AUTH_SECRET: z.string().min(MINIMUM_SECRET_LENGTH),

    // passkey の rpID になるため、デプロイごとに変わる URL を掴まないよう明示指定を必須にする
    BETTER_AUTH_URL: z.url(),

    // 未設定ならローカルディスク保存にフォールバックする(ローカル開発・CI 用)。
    // 本番 DB に接続している場合は下の refine で必須になる
    BLOB_READ_WRITE_TOKEN: z.string().optional(),

    // "true" のときだけ password サインインの passkey チェックを外す。
    // 本番 DB へローカルから繋いで写真を投入する作業でのみ使う(README 参照)
    PASSWORD_SIGN_IN_ENABLED: z.string().optional(),

    PAYLOAD_SECRET: z.string().min(MINIMUM_SECRET_LENGTH),
    POSTGRES_URL: z.string().min(NON_EMPTY),

    // サインアップを許可する唯一のメールアドレス。未設定ならサインアップは常に拒否される
    // (初期登録が済んだらこの環境変数を削除して再デプロイすることでエンドポイントを閉じる)
    SIGN_UP_ALLOWED_EMAIL: z.email().optional(),
  })
  // 本番 DB にメタデータを書くなら画像も永続ストレージに置く、という不変条件。
  // トークンが無いと storage-vercel-blob はプラグインごと無効化され、Payload が
  // ローカルディスクへ書き戻す。Vercel 上ではアップロードが失敗し、ローカルサーバーを
  // 本番 DB へ向けている場合は「書き込みは成功するが実ファイルは手元にしか無い」状態になる
  .refine(
    (environment) =>
      !isProductionDatabase(environment.POSTGRES_URL) || environment.BLOB_READ_WRITE_TOKEN != null,
    {
      message:
        "BLOB_READ_WRITE_TOKEN is required when POSTGRES_URL points at a non-local database. Without it uploads are written to a local filesystem that production cannot serve.",
      path: ["BLOB_READ_WRITE_TOKEN"],
    },
  )
