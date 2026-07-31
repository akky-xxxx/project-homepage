# service-main-h

`akky-xxxx` の個人ホームページ / フォトギャラリーサイト本体。[HonoX](https://github.com/honojs/honox)（Hono + ファイルベースルーティング + アイランドアーキテクチャ）で構築し、Vite でビルドして Wrangler 経由で Cloudflare Pages にデプロイする。

写真のメタデータは同一モノレポの `module-images-db`（`workspace:*`）から静的データとしてインポートする。実行時データベースは無い。

## セットアップ

パッケージマネージャーは Bun のみ。リポジトリルートで一括インストールする。

```bash
bun install
```

`.env.example` を参考に `.env` を作成し、`VITE_IMAGE_HOST` を設定する。

```bash
cp .env.example .env
```

## よく使うコマンド

このディレクトリ（`packages/service-main-h`）内、または `bun --cwd packages/service-main-h` で実行する。

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
