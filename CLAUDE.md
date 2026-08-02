# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code (claude.ai/code) に向けたガイダンスです。

## リポジトリ概要

これは `akky-xxxx` の個人ホームページ/フォトギャラリーサイトです。Bun で管理されたモノレポで、`packages/` 配下に3つのワークスペースパッケージがあります。

- **`main`** — 公開サイト本体。[HonoX](https://github.com/honojs/honox)（Hono + ファイルベースルーティング、アイランドアーキテクチャ）で構築され、Vite でビルドし、Wrangler 経由で Cloudflare Pages にデプロイされる。
- **`module-images-db`** — 写真のメタデータ（`ImagesDataBase`）を保持し、新しい写真を最適化して Google Cloud Storage にアップロード・メタデータを再生成する CLI スクリプトを提供する、独立したデータ/ビルド用パッケージ。`main` はこれを `module-images-db: "workspace:*"` として依存に持ち、`ImagesDataBase`、`Locations`、`Tags`、`Months` を静的データとしてインポートしている（実行時DBは無し）。
- **`cms`** — フォトギャラリーの管理画面。Payload CMS + Better Auth(passkey)で構築され、DB は PostgreSQL(`@payloadcms/db-vercel-postgres`)、画像は Vercel Blob、ホスティングは Vercel。`main`/`module-images-db` とは独立したパッケージで、管理者1人だけの運用を前提にしている。詳細は `packages/cms/README.md` を参照。

パッケージマネージャーは **Bun のみ** — `npm`/`yarn`/`pnpm` は意図的に無効化されている（ルート `package.json` の `engines` を参照。Bun を使うよう日本語で警告が表示される）。

## よく使うコマンド

特に断りがない限りリポジトリルートから実行する。`ws:*` スクリプトは `manypkg exec` を使い、全ワークスペースパッケージに対して同じスクリプトを実行する。

```bash
bun install                 # 依存関係のインストール（ワークスペース全体）
bun lint                    # eslint + prettier + editorconfig-checker + fixpack（ルートの設定ファイルのみ）
bun spell-check             # ./config/** に対する cspell
bun check-code              # lint + spell-check（ルート）
bun ws:check-code           # 各パッケージで lint + spell-check + type-check
bun test                    # ルートでの bun:test
bun fix                     # eslint --fix + fixpack + prettier --write（ルート）
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

`cms`(`packages/cms` 内で実行、docker compose での DB 起動が前提 — 下記「必須の環境変数」参照):

```bash
bun dev                     # docker compose up -d 済みのローカル DB に対して next dev
bun build                   # next build
bun start                   # next start(本番向けにビルド済み成果物を起動。本番 DB へ写真を投入する際に使う)
bun test                    # test:int(vitest) と test:e2e(playwright) をまとめて実行(bun:test ではない)
bun test:int                # vitest(要 docker compose up -d)
bun test:e2e                # playwright(dev サーバーは自動起動)
bun payload migrate:create <name>   # コレクション/フィールド変更後、マイグレーションを生成
```

トップレベルで一括の「ビルド」というものは無く、各パッケージが個別にビルドされる。デプロイ対象の成果物は `main` と `cms`。

## 必須の環境変数

- `main`: `VITE_IMAGE_HOST`（`packages/main/.env.example` を参照）。
- `module-images-db`: `BUCKET`（GCS バケット名、`EnvironmentSchema` でバリデーション）に加え、GCP サービスアカウントの JSON（`src/shared/schemas/CredentialSchema` の `CredentialSchema` でバリデーション）。これは `src/shared/utils/storageBucket` が `@google-cloud/storage` と通信する際に使われる。`packages/module-images-db/.env.example` を参照。
- `cms`: `ENVIRONMENT`（`src/shared/const/ENVIRONMENT`、`EnvironmentSchema` でバリデーション）が起動時に検証する。主な変数は `POSTGRES_URL`(必須)、`PAYLOAD_SECRET`/`BETTER_AUTH_SECRET`(必須、32文字以上)、`BETTER_AUTH_URL`(必須、passkey の rpID になるため本番では固定ドメインが必要)、`SIGN_UP_ALLOWED_EMAIL`(任意、初回サインアップ許可用)、`BLOB_READ_WRITE_TOKEN`(本番 DB 接続時は必須。ローカル DB なら省略可で画像はローカルディスクに保存される)。初回セットアップ手順・写真投入手順・マイグレーション運用の詳細は `packages/cms/README.md` を参照。

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

### `cms` — フォトギャラリー管理画面

- Next.js 上に構築された Payload CMS。認証は `@delmaredigital/payload-better-auth` 経由の Better Auth で、passkey 専用(password はブートストラップ専用で、passkey 登録後は `authBeforeHook` が拒否する)。
- **コレクション**: `src/collections/` の `GalleryAreas`/`GalleryPhotos`/`GalleryTags`(写真メタデータ)と `Users`(admin 限定で書き込み可能。`role`/`emailVerified` はフィールド単位でも admin チェックが入る)。
- **マイグレーション**: `src/migrations/` に手動生成・コミットする(`bun payload migrate:create <name>`)。生成物のため lint/format 対象外で、手で編集しない。ローカル開発は Payload の dev push でスキーマが自動生成されるためマイグレーション実行は不要。`vercel-build` が `payload migrate` を実行してから本番ビルドする。
- **画像ストレージ**: `BLOB_READ_WRITE_TOKEN` があれば Vercel Blob、無ければローカルディスクに保存(`@payloadcms/storage-vercel-blob`)。
- `src/payload-types.ts` は `payload generate:types` の生成物。
- 認証の詳細設計、本番初回セットアップ手順、写真投入手順、passkey 紛失時の復旧手順、Vercel 運用チェックリストは `packages/cms/README.md` に詳しくまとまっている。

## 規約

- **1フォルダにつき1エクスポート、常に `index.ts`/`index.tsx`**: コンポーネント、util、const、type、style、hook などほぼすべての単位が、エクスポート対象の名前を持つ専用ディレクトリに配置され、中身は `index.ts(x)` のみとなっている。これはルートの `eslint.config.mjs` にある `sc-js/file-path-patterns` ESLint ルールで強制されており、設定ファイルなど一部のみが許可リストの例外となっている。新規ファイルを追加する際もこのパターンに従うこと。単独のファイルを並べて置かない。
- **テストのコロケーション(`main`/`module-images-db`)**: `index.test.ts` はテスト対象の `index.ts` の隣に置かれ、`bun:test`（`describe`/`it`/`expect`、しばしば `it.each` を使用）で書かれる。`cms` はこの規約の対象外で、結合テストは `tests/int/**/*.int.spec.ts`(Vitest)、E2E は `tests/e2e/**/*.e2e.spec.ts`(Playwright)に配置する(詳細は `packages/cms/README.md` の「テスト」節を参照)。
- **コミットメッセージ**: commitlint（`commitlint.config.ts`）によって、`commit-msg` の husky フック（`bun commitlint`）経由で強制される。Conventional Commits のタイプのみ許可: `chore|feat|fix|docs|style|refactor|test|revert`。`scope` は**必須**で、`root`、`*`、`packages`、またはワークスペースパッケージのディレクトリ名（現状 `module-images-db`、`main`、`cms`)のいずれかでなければならない — `config/commitlint/dirs` を参照。例: `refactor(module-images-db): rename to PREFECTURES`。
- **pre-push フック**（`.husky/pre-push`）は `bun install --frozen-lockfile && bun check-code && bun ws:check-code && bun test` を実行する — push 前にこれが走ることを前提とすること。
- Lint は階層化されている: ルートの ESLint 設定はトップレベル/設定ファイルのみを対象とする（`eslint.config.mjs`、`ignores: ["packages"]`）。各パッケージは自身の `app/`/`src/` 用に独自の `eslint.config.js.mjs` を持ち、そのパッケージの `lint:product-code`/`lint:config` スクリプト経由で実行される。
- 整形は Prettier が担い、ESLint 側には整形ルールを持たせていない。各パッケージの `fix`/`lint` は `fix:prettier`/`lint:prettier` として ESLint とは別ステップで実行される。
- ロックファイルは Bun のテキスト形式ロックファイル `bun.lock` 単一構成。以前存在した `bun.lockb`/`yarn.lock` の併用構成は廃止されている。
