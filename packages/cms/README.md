# CMS

Payload CMS + Better Auth(passkey)で構築した、フォトギャラリーの管理画面。DB は PostgreSQL(`@payloadcms/db-vercel-postgres`)、画像は Vercel Blob、ホスティングは Vercel。

管理者 1 人だけの運用を前提にしている。公開サイトは別パッケージ(`packages/main`)で、この CMS は管理画面専用。

## 環境変数

`ENVIRONMENT`(`src/shared/const/ENVIRONMENT`)が起動時に検証する。条件を満たさないと起動・ビルドが失敗する。

| 変数                       | 必須   | ローカル `.env`           | Vercel Production      | 説明                                                                             |
| -------------------------- | ------ | ------------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `DB_POSTGRES_URL`          | 必須   | docker の接続文字列       | Postgres の接続文字列  | 空文字不可                                                                       |
| `PAYLOAD_SECRET`           | 必須   | `openssl rand -base64 32` | 本番用に別の値を生成   | 32 文字以上                                                                      |
| `BETTER_AUTH_SECRET`       | 必須   | `openssl rand -base64 32` | 本番用に別の値を生成   | 32 文字以上                                                                      |
| `BETTER_AUTH_URL`          | 必須   | `http://localhost:3000`   | 固定のカスタムドメイン | passkey の rpID になる。デプロイごとに変わる URL は不可                          |
| `SIGN_UP_ALLOWED_EMAIL`    | 任意   | `dev@payloadcms.com`      | 初回登録時のみ設定     | 未設定ならサインアップは常に拒否                                                 |
| `BLOB_READ_WRITE_TOKEN`    | 条件付 | 設定しない                | 設定する               | ローカル DB なら省略可(画像はローカルディスク保存)。本番 DB に接続していると必須 |
| `PASSWORD_SIGN_IN_ENABLED` | 任意   | 設定しない                | **設定しない**         | 写真投入作業のときだけコマンドラインで渡す                                       |

Preview 環境を使う場合、`PAYLOAD_SECRET` / `BETTER_AUTH_SECRET` は Production と別の値にし、`DB_POSTGRES_URL` は本番 DB を指さないこと。

Vercel の Marketplace 経由で Neon(Postgres)・Blob をプロジェクトに接続すると、接頭辞付き(`DB_`)の `DB_DATABASE_URL` / `DB_DATABASE_URL_UNPOOLED` / `DB_PGHOST` / `DB_PGUSER` / `DB_PGDATABASE` / `DB_PGPASSWORD` / `DB_POSTGRES_URL_NON_POOLING` / `DB_POSTGRES_USER` / `DB_POSTGRES_HOST` / `DB_POSTGRES_PASSWORD` / `DB_POSTGRES_DATABASE` / `DB_POSTGRES_URL_NO_SSL` / `DB_POSTGRES_PRISMA_URL` / `BLOB_STORE_ID` など多数の変数が自動で発行されるが、`EnvironmentSchema` が読むのは上表の `DB_POSTGRES_URL`(pooled、"Recommended for most uses" のもの)と `BLOB_READ_WRITE_TOKEN` の 2 つだけ。他は未使用なのでこのプロジェクトでは無視してよい(ローカル `.env` には一切設定しない)。値そのものは Neon 連携が自動で発行するので自由だが、`DB_` 接頭辞の変数名であることが必須。

## 手順 1: ローカル開発環境を作る

```bash
cp .env.example .env
# .env の PAYLOAD_SECRET と BETTER_AUTH_SECRET を openssl rand -base64 32 の出力で埋める
docker compose up -d
bun install
bun dev
```

`http://localhost:3000` を開く。DB を止めるときは `docker compose down`(データボリュームごと消すなら `-v`)。

ローカルの DB スキーマは Payload の dev push が自動で作る。マイグレーションの実行は不要。

`gallery-areas`(都道府県)は他のデータと relational だが値そのものは不変な固定リストなので、以下で一括投入する(既存レコードはスキップされるため何度実行しても安全)。

```bash
bun run seed:gallery-areas
```

本番 DB に対して実行する場合は、手順 3 の写真投入と同様に `DB_POSTGRES_URL` をコマンドラインで渡す。

```bash
DB_POSTGRES_URL='<本番 DB_POSTGRES_URL>' bun run seed:gallery-areas
```

`gallery-tags` も同様に一括投入できる。こちらは可変(今後タグが増える)だが、既存レコードは削除しない・スキップするだけなので、一度投入したタグを消してしまう心配なく何度でも実行できる。将来的には本番 DB のダンプを正とする運用に切り替える想定で、それまでの暫定手段。

```bash
bun run seed:gallery-tags
DB_POSTGRES_URL='<本番 DB_POSTGRES_URL>' bun run seed:gallery-tags
```

## 手順 2: 本番の初回セットアップ

**この手順を完了するまで、サインアップ API は誰でも叩ける状態にある。** 守りになっているのは `SIGN_UP_ALLOWED_EMAIL` の値を知らないと登録できないことだけなので、推測されにくいエイリアスを使い、デプロイから登録までを続けて行うこと。

1. Vercel で Blob ストアを作成し、プロジェクトに接続する(`BLOB_READ_WRITE_TOKEN` が環境変数に入る)。
2. Vercel の環境変数に `DB_POSTGRES_URL` / `PAYLOAD_SECRET` / `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL` を設定する。
3. `SIGN_UP_ALLOWED_EMAIL` に**推測されにくいエイリアス**を設定する(例: `cms-admin+7f3a9c2e@example.com`)。この値が実質的なセットアップトークンになる。
4. デプロイする。`vercel-build` が `payload migrate` を実行してからビルドするので、この時点で DB にテーブルが作られる。
5. `https://<本番ドメイン>/login` を開き、3 で設定したアドレスでサインアップする。
6. **続けてそのまま passkey を登録する。** password ログインが使えるのは passkey を登録するまでの間だけ。
7. Vercel から `SIGN_UP_ALLOWED_EMAIL` を**削除して再デプロイする**。環境変数はモジュール読み込み時に評価されるため、削除しただけでは反映されない。
8. `https://<本番ドメイン>/login` からサインアップを試み、拒否されることを確認する。

以降、本番へのログインは passkey のみ。

## 手順 3: 写真を投入する

Vercel Function にはリクエストボディ 4.5MB の制限があるため、大きな写真は本番の管理画面からはアップロードできない。ローカルで起動したサーバーを本番 DB / Blob に向けて投入する。

**`.env` に本番の値を書かないこと。** 下記のようにコマンドラインで渡す(dotenv は既存の環境変数を上書きしないため、この指定が優先される)。

```bash
# 1. バックアップを取る。この作業中の削除・編集は即座に本番へ反映される
pg_dump '<本番 DB_POSTGRES_URL>' -Fc -f "backup-$(date +%Y%m%d).dump"

# 2. ビルドする
bun build

# 3. 本番に向けて production モードで起動する
DB_POSTGRES_URL='<本番 DB_POSTGRES_URL>' \
BLOB_READ_WRITE_TOKEN='<本番トークン>' \
PASSWORD_SIGN_IN_ENABLED=true \
NODE_ENV=production \
bun start
```

4. `http://localhost:3000/login` を開き、password でログインする。
5. 管理画面の左上に「本番 DB に接続中」の赤いバナーが出ていることを確認する。出ていなければ接続先がローカル DB なので、環境変数を見直す。
6. Gallery Photos から写真をアップロードする。上限は 1 ファイル 30MB。
7. 作業が終わったらサーバーを停止する(Ctrl-C)。

注意点:

- **`NODE_ENV=production` は必須。** dev モードで本番 DB に繋ぐと Payload が dev スキーマ push を実行し、本番のスキーマを書き換えてしまう
- `PASSWORD_SIGN_IN_ENABLED` が必要なのは、passkey が rpID(= `BETTER_AUTH_URL` のホスト)に紐づき、本番ドメインで登録した passkey を localhost では使えないため。このフラグは `BETTER_AUTH_URL` が localhost のときだけ効く
- `PASSWORD_SIGN_IN_ENABLED` を Vercel の環境変数に設定しないこと

## 手順 4: スキーマを変更したとき

コレクションやフィールドを変更したら、デプロイ前にマイグレーションを生成してコミットする。

```bash
bun payload migrate:create <name>
```

`src/migrations/` に生成される 2 ファイル(`.ts` と `.json`)をコミットする。Vercel では `vercel-build` が `payload migrate` を実行して適用する。本番は `NODE_ENV=production` のため dev push が走らず、マイグレーションが無いとスキーマが更新されない。

生成物のためリンタ・フォーマッタの対象外にしてある。手で編集しないこと。

Vercel への適用は `vercel-build`(`cross-env NODE_OPTIONS=--no-deprecation payload migrate && bun run build`)に乗っかる形で、デプロイのたびに自動実行される。個別に「このマイグレーションを使う」と指定する操作は無く、`src/migrations/index.ts` の配列を先頭から見て、本番 DB 側の管理テーブル(`payload_migrations`)と突き合わせ、未適用のものだけを順に自動適用する。新しいマイグレーションはこの配列の末尾に追加される。

過去の(すでに適用済みの)マイグレーションファイルは、原則として削除しないこと。`payload_migrations` テーブルには適用済みの記録が残るので既存の本番環境がすぐ壊れることはないが、`payload migrate` は「まっさらな DB」に対して配列を先頭から全部再生してスキーマを組み立てる前提のコマンドであるため、途中のファイルを消すと DB を作り直す(新しい環境を立てる・災害復旧でリストアする等)ときにスキーマが欠落し、今の本番と一致しなくなる。整理したい場合は個別に `rm` するのではなく、複数のマイグレーションを1つに統合(スカッシュ)し、統合後のマイグレーションが同じ最終スキーマを作ることを検証してから古いファイルを消すこと。

## 手順 5: passkey を全て失ったとき

1. 本番 Postgres の `passkeys` から該当ユーザーの行を削除する。
2. `https://<本番ドメイン>/login` から password でログインする(passkey が 0 件になったので通る)。
3. すぐに passkey を登録し直す。

password を忘れている場合は、`users` / `accounts` / `sessions` / `passkeys` から該当ユーザーの行を削除し、手順 2 をやり直す。

## 認証の設計

- **password はブートストラップ専用。** passkey を登録すると、それ以降その account の password ログインは `authBeforeHook` が拒否する。例外は `PASSWORD_SIGN_IN_ENABLED=true` かつ localhost のときだけ。
- **サインアップは `SIGN_UP_ALLOWED_EMAIL` と一致し、かつ users が 0 件のときだけ通る。** 未設定なら常に拒否。拒否時のレスポンスはどの条件でも同一で、どこで落ちたかは外部から分からない。
- `role` はサーバー側専用のフィールドで、サインアップ時にクライアントから指定できない。最初の 1 人だけが `admin` になる。
- `users` コレクションの create / update / delete は admin 限定。`role` と `emailVerified` にはフィールド単位の admin チェックも入れてある。
- 画像は `BLOB_READ_WRITE_TOKEN` があれば Vercel Blob、無ければローカルディスクに保存する。アップロード上限は 30MB(`payload.config.ts` の `upload.limits.fileSize`)で、超過時は 413 を返す。

## Vercel 運用チェックリスト

- `BETTER_AUTH_URL` は利用する全環境(Production / Preview)に設定する。未設定だとビルドが失敗する。本番では**固定のカスタムドメイン**を指定する(passkey の rpID になるため、デプロイごとに変わる URL を掴むと登録済みの passkey が使えなくなる)。
- `PAYLOAD_SECRET` / `BETTER_AUTH_SECRET` は Production と Preview で別の値にする。
- Preview を本番 DB に接続しない。
- `BLOB_READ_WRITE_TOKEN` を Production に設定する。未設定だとビルドが失敗する(本番 DB に接続している場合は `EnvironmentSchema` が必須にしている)。
- Preview は Vercel Authentication で保護する。保護しない場合、Preview デプロイも管理画面と認証 API への入口になる。なお Hobby プランで使える Standard Protection は Preview と生成 URL のみが対象で、**Production のカスタムドメインは保護されない**(Production も保護するには Pro 以上の All Deployments が必要)。

## テスト

```bash
bun test:int    # vitest(要 docker compose up -d)
bun test:e2e    # playwright(dev サーバーは自動起動)
bun check-code  # lint / spell-check / type-check
```

int テストはサインアップの検証で「users が 0 件」の状態を前提とするため、実行前にローカル DB のユーザーを空にしておく(テスト自身は作成したユーザーを後片付けする)。
