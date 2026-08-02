import { z } from "zod"

// 32 文字は `openssl rand -base64 32` 相当。これを下回る secret は署名鍵として弱すぎるため弾く
const MINIMUM_SECRET_LENGTH = 32

const NON_EMPTY = 1

export const EnvironmentSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(MINIMUM_SECRET_LENGTH),

  // passkey の rpID になるため、デプロイごとに変わる URL を掴まないよう明示指定を必須にする
  BETTER_AUTH_URL: z.url(),

  // "true" のときだけ password サインインの passkey チェックを外す。
  // 本番 DB へローカルから繋いで写真を投入する作業でのみ使う(README 参照)
  PASSWORD_SIGN_IN_ENABLED: z.string().optional(),

  PAYLOAD_SECRET: z.string().min(MINIMUM_SECRET_LENGTH),
  POSTGRES_URL: z.string().min(NON_EMPTY),

  // サインアップを許可する唯一のメールアドレス。未設定ならサインアップは常に拒否される
  // (初期登録が済んだらこの環境変数を削除して再デプロイすることでエンドポイントを閉じる)
  SIGN_UP_ALLOWED_EMAIL: z.email().optional(),
})
