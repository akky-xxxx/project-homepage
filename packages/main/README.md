# main

`akky-xxxx` の個人ホームページ / フォトギャラリーサイト本体。[HonoX](https://github.com/honojs/honox)（Hono + ファイルベースルーティング + アイランドアーキテクチャ）で構築し、Vite でビルドして Wrangler 経由で Cloudflare Pages にデプロイする。

写真のメタデータは同一モノレポの `module-images-db`（`workspace:*`）から静的データとしてインポートする。実行時データベースは無い。

## セットアップ

パッケージマネージャーは Bun のみ。リポジトリルートで一括インストールする。

```bash
bun install
```

`.env.example` を参考に `.env` を作成し、`VITE_IMAGE_HOST`・`CMS_HOST`・`CMS_API_KEY` を設定する。

```bash
cp .env.example .env
```

## 環境変数

| 変数              | 用途                                                                               | ローカル                       | GitHub Actions(デプロイ) |
| ----------------- | ---------------------------------------------------------------------------------- | ------------------------------ | ------------------------ |
| `VITE_IMAGE_HOST` | 写真画像を配信するホスト                                                           | `.env`                         | `vars.VITE_IMAGE_HOST`   |
| `CMS_HOST`        | `cms` の API ホスト                                                                | `.env`                         | `vars.CMS_HOST`          |
| `CMS_API_KEY`     | `cms` の `api-keys` コレクションで発行する API Key。`Authorization` ヘッダーに使う | `.env`(`cms` の管理画面で発行) | `secrets.CMS_API_KEY`    |

`CMS_HOST`・`CMS_API_KEY` は `VITE_` 接頭辞の変数と同じ仕組み(Vite の `envPrefix`)で埋め込まれるが、これはビルド時に値が定数として埋め込まれることを意味するだけで、サーバー専用データであることを保証しない。実際の安全性は `vite.config.ts` のコメントと `check:client-bundle-secrets` gate(`package.json`)で担保している。

## よく使うコマンド

このディレクトリ（`packages/main`）内、または `bun --cwd packages/main` で実行する。

```bash
bun dev                          # vite の開発サーバーを起動
bun run build                    # vite build --mode client && vite build
bun preview                      # wrangler pages dev ./dist（ビルド成果物をローカルで確認）
bun run deploy                   # ビルド後に wrangler pages deploy ./dist（predeploy で check-code + test が走る）
bun log                          # wrangler pages deployment tail

bun type-check                   # tsc（型チェックのみ、出力なし）
bun lint                         # lint:config / lint:editorconfig / lint:markup / lint:pack / lint:prettier / lint:product-code
bun lint:product-code            # app/ を対象にした eslint（--max-warnings 0）
bun spell-check                  # ./{config,app}/** を対象にした cspell
bun check-code                   # lint + spell-check + type-check

bun test                         # bun:test を実行
bun test path/to/index.test.ts   # 単一のテストファイルを実行
bun test -t "test name"          # テスト名でフィルタして実行

bun fix                          # eslint --fix / fixpack / prettier をまとめて実行
```

> `build`・`deploy` は Bun 自身の予約サブコマンド（`build` はバンドラー、`deploy` は将来のために予約済み）と名前が衝突するため、`bun run build`・`bun run deploy` と明示する必要がある。それ以外（`dev`/`preview`/`lint` など）はスクリプト名が Bun のビルトインコマンドと衝突しないため `bun <script>` の省略形で問題ない。

## ディレクトリ構成

```
app/
├── routes/         # HonoX のファイルベースルーティング（createRoute をデフォルトエクスポート）
├── islands/        # クライアントサイドでハイドレートするインタラクティブなコンポーネント
├── components/
│   ├── atoms/      # 再利用可能な小さな部品
│   ├── icons/
│   ├── pages/      # ルート/ページごとの実装（PhotoGallery、PhotoDetail、Profile など）
│   └── Layout/     # サイト全体の枠組み/ナビゲーション
├── shared/         # 共通の const / types / utils / styles（Colors、Spaces、MediaQueries など）
├── styles/         # hono/css によるグローバル/共通スタイル
├── server.ts       # honox/server の createApp()（Cloudflare Pages Function のエントリポイント）
└── client.ts       # honox/client の createClient()（アイランドのハイドレーション）
```

各コンポーネント/util/const/type/style は「1フォルダにつき1エクスポート、中身は `index.ts(x)` のみ」という規約に従う。テストは対象ファイルの隣に `index.test.ts` としてコロケーションする。

詳細な規約・アーキテクチャの説明はリポジトリルートの `CLAUDE.md` を参照。

## デプロイ

Wrangler 経由で Cloudflare Pages にデプロイする。`bun run deploy` はビルド後に `wrangler pages deploy ./dist` を実行し、その前段の `predeploy` で `check-code` と `test` が自動的に走る。
