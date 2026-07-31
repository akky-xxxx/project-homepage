# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code (claude.ai/code) に向けたガイダンスです。

## リポジトリ概要

これは `akky-xxxx` の個人ホームページ/フォトギャラリーサイトです。Bun で管理されたモノレポで、`packages/` 配下に2つのワークスペースパッケージがあります。

- **`main`** — 公開サイト本体。[HonoX](https://github.com/honojs/honox)（Hono + ファイルベースルーティング、アイランドアーキテクチャ）で構築され、Vite でビルドし、Wrangler 経由で Cloudflare Pages にデプロイされる。
- **`module-images-db`** — 写真のメタデータ（`ImagesDataBase`）を保持し、新しい写真を最適化して Google Cloud Storage にアップロード・メタデータを再生成する CLI スクリプトを提供する、独立したデータ/ビルド用パッケージ。`main` はこれを `module-images-db: "workspace:*"` として依存に持ち、`ImagesDataBase`、`Locations`、`Tags`、`Months` を静的データとしてインポートしている（実行時DBは無し）。

パッケージマネージャーは **Bun のみ** — `npm`/`yarn`/`pnpm` は意図的に無効化されている（ルート `package.json` の `engines` を参照。Bun を使うよう日本語で警告が表示される）。

## よく使うコマンド

特に断りがない限りリポジトリルートから実行する。`ws:*` スクリプトは `manypkg exec` を使い、全ワークスペースパッケージに対して同じスクリプトを実行する。

```bash
bun install                 # 依存関係のインストール（ワークスペース全体）
bun lint                    # eslint + editorconfig-checker（ルートの設定ファイルのみ）
bun spell-check             # ./config/** に対する cspell
bun check-code              # lint + spell-check（ルート）
bun ws:check-code           # 各パッケージで lint + spell-check + type-check
bun test                    # ルートでの bun:test
bun fix                     # eslint --fix + fixpack（ルート）
bun ws:fix                  # 各パッケージで同上
bun all-check                # check-code + ws:spell-check + test
```

パッケージ単位（`packages/main` または `packages/module-images-db` 内で実行、あるいは `bun --cwd` 経由）:

```bash
bun dev                     # main: vite の開発サーバー
bun build                   # main: vite build --mode client && vite build
bun preview                 # main: wrangler pages dev ./dist
bun deploy                  # main: ビルド後に `wrangler pages deploy ./dist`
bun log                     # main: wrangler pages deployment tail

bun type-check              # tsc（型チェックのみ、出力なし）
bun lint:product-code       # app/ または src/ のみを対象にした eslint、--max-warnings 0
bun test                    # そのパッケージの bun:test
bun test path/to/index.test.ts   # 単一のテストファイルを実行
bun test -t "test name"          # テスト名でフィルタして実行
```

`module-images-db` の画像パイプライン（`packages/module-images-db` 内で実行、GCS の認証情報が必要 — 下記参照）:

```bash
bun image-add               # origin-image/ 内のファイルを最適化・アップロードし、src/index.ts の定数を再生成
bun image-delete            # src/const/IMAGES に存在しなくなった画像の GCS オブジェクトを削除し、fix を実行
```

トップレベルで一括の「ビルド」というものは無く、各パッケージが個別にビルドされる。デプロイ対象の成果物は `main`。

## 必須の環境変数

- `main`: `VITE_IMAGE_HOST`（`packages/main/.env.example` を参照）。
- `module-images-db`: `BUCKET`（GCS バケット名、`EnvironmentSchema` でバリデーション）に加え、GCP サービスアカウントの JSON（`src/shared/schemas/CredentialSchema` の `CredentialSchema` でバリデーション）。これは `src/shared/utils/storageBucket` が `@google-cloud/storage` と通信する際に使われる。`packages/module-images-db/.env.example` を参照。

## アーキテクチャ

### `module-images-db` — 写真メタデータとアップロードパイプライン

- `src/index.ts` が**信頼できる情報源（source of truth）**: 手動で管理された写真レコードの配列（`area`、`date`、`imageId`、`tags`）で、各要素は `ImagesDataBaseRecord` を `satisfies` する。モジュール読み込み時にソート（`sortImageDataBase`）とタグ正規化（`sortTags`）が行われ、`ImagesDataBase` として再エクスポートされる。あわせて、固定の `PREFECTURES` リストに対してフィルタした `Locations`、重複排除しソート済みの `Tags`、重複排除して新しい順にソートした `Months`（`YYYY-MM` 形式）も導出・エクスポートされる。
- `src/upload-image/index.ts` は CLI エントリポイント: `origin-image/` からファイルを読み込み、`.temporary-image/` の一時ディレクトリへ移動し、最適化（`sharp` を用いた `optimizeImage`）、GCS へのアップロード（`upload`）、定数ファイルの再生成（`createImageConstant`）を行った後にクリーンアップする。`bun image-add` から呼ばれる。
- `src/delete-image/index.ts` はその逆の処理: GCS 上のオブジェクトと `src/const/IMAGES` を突き合わせ、不要になったファイル（`EXTENSIONS` に従いサムネイルとメイン画像の両方）を削除する。`bun image-delete` から呼ばれる。
- 各写真は `EXTENSIONS` に従い、`imageId` をキーとした2種類の保存バリアント（サムネイル + メイン）を持つ。
- このパッケージに HTTP サーバーは無く、純粋にデータモジュール + 2つの CLI スクリプトであり、`main` からビルド時/実行時にインメモリのデータセットとして利用される。

### `main` — サイト本体

- **ルーティング**: `app/routes/` 配下で HonoX によるファイルベースルーティング。各ルートファイルは `createRoute((c) => ...)` をデフォルトエクスポートする。`app/routes/_renderer.tsx` が共通の HTML シェル（`<html>`/`<head>`/`<Layout>`）を定義し、`_404.tsx`/`_error.tsx` がエラーページを扱う。
- **エントリポイント**: `app/server.ts`（`honox/server` の `createApp()`、Cloudflare Pages Function としてデプロイされる）と `app/client.ts`（`honox/client` の `createClient()`、ブラウザでアイランドをハイドレートする）。
- **アイランド**: インタラクティブなクライアントサイドコンポーネントは `app/islands/`（例: ライト/ダーク切り替えの `ExteriorSwitch`）に配置され、アイランドアーキテクチャのパターンに従い、静的にサーバーレンダリングされたツリーとは独立にハイドレートされる。
- **コンポーネント**: `components/atoms`（再利用可能な小さな部品）、`components/icons`、`components/pages`（ルート/ページごとに1フォルダ、例: `PhotoGallery`、`PhotoDetail`、`Profile`）、`components/Layout`（サイト全体の枠組み/ナビゲーション）として整理されている。ネストした `components/`/`modules/`/`styles`/`const`/`types` サブフォルダに、そのコンポーネント固有のヘルパーがコロケーションされている。
- **スタイリング**: `hono/css` の `css` タグ付きテンプレートによる CSS-in-JS（`app/styles/`、`**/styles/*Style/index.ts`、および `app/shared/styles/` にある共通トークン群 — `Colors`、`Spaces`、`MediaQueries` など、を参照）。CSS フレームワークは使用していない。
- **パスエイリアス**（`tsconfig.json`）: `@atoms/*`、`@icons/*`、`@islands/*`、`@shared/*` はすべて `app/` 配下に解決され、`vite.config.ts` の `vite-tsconfig-paths` で有効化されている。
- **フォトギャラリーのドメインロジック**: 写真の検索/フィルタ/ページネーションは `app/shared/utils/getSearchedImages`（`isIncludesTag`、`isSameLocation`、`isStartsWithDate` などの述語モジュール）と `app/components/pages/PhotoGallery/components/Pagination/modules/*` にある。クエリ文字列の型は `PhotoGallerySearchQueries`/`PhotoGallerySearchKey`。
- **デプロイ**: Wrangler 経由で Cloudflare Pages にデプロイ（`bun deploy` はビルド後に `wrangler pages deploy ./dist` を実行）。`predeploy` は事前に `check-code` と `test` を実行する。

## 規約

- **1フォルダにつき1エクスポート、常に `index.ts`/`index.tsx`**: コンポーネント、util、const、type、style、hook などほぼすべての単位が、エクスポート対象の名前を持つ専用ディレクトリに配置され、中身は `index.ts(x)` のみとなっている。これはルートの `eslint.config.mjs` にある `sc-js/file-path-patterns` ESLint ルールで強制されており、設定ファイルなど一部のみが許可リストの例外となっている。新規ファイルを追加する際もこのパターンに従うこと。単独のファイルを並べて置かない。
- **テストのコロケーション**: `index.test.ts` はテスト対象の `index.ts` の隣に置かれ、`bun:test`（`describe`/`it`/`expect`、しばしば `it.each` を使用）で書かれる。
- **コミットメッセージ**: commitlint（`commitlint.config.ts`）によって、`commit-msg` の husky フック（`bun commitlint`）経由で強制される。Conventional Commits のタイプのみ許可: `chore|feat|fix|docs|style|refactor|test|revert`。`scope` は**必須**で、`root`、`*`、`packages`、またはワークスペースパッケージのディレクトリ名（現状 `module-images-db`、`main`）のいずれかでなければならない — `config/commitlint/dirs` を参照。例: `refactor(module-images-db): rename to PREFECTURES`。
- **pre-push フック**（`.husky/pre-push`）は `bun install --frozen-lockfile && bun check-code && bun ws:check-code && bun test` を実行する — push 前にこれが走ることを前提とすること。
- Lint は階層化されている: ルートの ESLint 設定はトップレベル/設定ファイルのみを対象とする（`eslint.config.mjs`、`ignores: ["packages"]`）。各パッケージは自身の `app/`/`src/` 用に独自の `eslint.config.js.mjs` を持ち、そのパッケージの `lint:product-code`/`lint:config` スクリプト経由で実行される。
- リポジトリには `bun.lockb` と `yarn.lock` の両方が存在する。`bunfig.toml` で `install.lockfile.print = "yarn"` が設定されており（Bun のバイナリロックファイルと並行して yarn 形式のロックファイルも同期して保持されている）、理由を確認せずにどちらか一方を削除しないこと。
