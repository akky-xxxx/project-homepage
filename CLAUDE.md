# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code (claude.ai/code) に向けたガイダンスです。

## リポジトリ概要

これは `akky-xxxx` の個人ホームページ/フォトギャラリーサイトです。Bun で管理されたモノレポで、`packages/` 配下に4つのワークスペースパッケージがあります。

- **`main`** — 公開サイト本体。[HonoX](https://github.com/honojs/honox)（Hono + ファイルベースルーティング、アイランドアーキテクチャ）で構築され、Vite でビルドし、Wrangler 経由で Cloudflare Pages にデプロイされる。
- **`module-images-db`** — 写真のメタデータ（`ImagesDataBase`）を保持し、新しい写真を最適化して Google Cloud Storage にアップロード・メタデータを再生成する CLI スクリプトを提供する、独立したデータ/ビルド用パッケージ。`main` はこれを `module-images-db: "workspace:*"` として依存に持ち、`ImagesDataBase`、`Locations`、`Tags`、`Months` を静的データとしてインポートしている(実行時DBは無し)。
- **`cms`** — フォトギャラリーの管理画面。Payload CMS + Better Auth(passkey)で構築され、DB は PostgreSQL(`@payloadcms/db-vercel-postgres`)、画像は Vercel Blob、ホスティングは Vercel。管理者1人だけの運用を前提にしている。詳細は `packages/cms/README.md` を参照。
- **`cms-types`** — `cms` の `payload generate:types` が出力する型定義(`src/payload-types.ts`)を置く、独立した型定義専用パッケージ。`cms`/`main` はこれを `cms-types: "workspace:*"` として依存に持ち、`cms-types/src` から型をインポートする。詳細は `packages/cms-types/README.md` を参照。

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
bun all-check                # check-code + ws:check-code + test
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
bun image-add               # origin-image/ 内のファイルを最適化・アップロードし、src/const/IMAGES の定数を再生成
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

- `main`: `VITE_IMAGE_HOST`、`CMS_HOST`（`CMS_HOST` は `EnvironmentSchema` でバリデーション。いずれも `packages/main/.env.example` を参照）。
- `module-images-db`: `BUCKET`（GCS バケット名、`EnvironmentSchema` でバリデーション）に加え、GCP サービスアカウントの JSON（`src/shared/schemas/CredentialSchema` の `CredentialSchema` でバリデーション）。これは `src/shared/utils/storageBucket` が `@google-cloud/storage` と通信する際に使われる。`packages/module-images-db/.env.example` を参照。
- `cms`: `ENVIRONMENT`（`src/shared/const/ENVIRONMENT`、`EnvironmentSchema` でバリデーション）が起動時に検証する。主な変数は `DB_POSTGRES_URL`(必須。Vercel の Neon 連携が付与する `DB_` 接頭辞付きの命名に合わせている)、`PAYLOAD_SECRET`/`BETTER_AUTH_SECRET`(必須、32文字以上)、`BETTER_AUTH_URL`(必須、passkey の rpID になるため本番では固定ドメインが必要)、`SIGN_UP_ALLOWED_EMAIL`(任意、初回サインアップ許可用)、`BLOB_READ_WRITE_TOKEN`(本番 DB 接続時は必須。ローカル DB なら省略可で画像はローカルディスクに保存される)。初回セットアップ手順・写真投入手順・マイグレーション運用の詳細は `packages/cms/README.md` を参照。

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
- **コレクション**: `src/collections/` の `GalleryAreas`/`GalleryPhotos`/`GalleryTags`(写真メタデータ)、`Users`(admin 限定で書き込み可能。`role`/`emailVerified` はフィールド単位でも admin チェックが入る)、`ApiKeys`(`main` からの API 呼び出しを認証する API Key 専用コレクション。発行・削除は admin 限定)。
- **マイグレーション**: `src/migrations/` に手動生成・コミットする(`bun payload migrate:create <name>`)。生成物のため lint/format 対象外で、手で編集しない。ローカル開発は Payload の dev push でスキーマが自動生成されるためマイグレーション実行は不要。`vercel-build` が `payload migrate` を実行してから本番ビルドする。
- **画像ストレージ**: `BLOB_READ_WRITE_TOKEN` があれば Vercel Blob、無ければローカルディスクに保存(`@payloadcms/storage-vercel-blob`)。
- `payload generate:types` の生成物 `payload-types.ts` は `packages/cms-types` 側(`src/payload-types.ts`)に置かれ、`cms` からは `cms-types: "workspace:*"` の依存経由で `cms-types/src` からインポートする(`outputFile` も `payload.config.ts` で `packages/cms-types/src/payload-types.ts` を指すよう設定している)。
- 認証の詳細設計、本番初回セットアップ手順、写真投入手順、passkey 紛失時の復旧手順、Vercel 運用チェックリストは `packages/cms/README.md` に詳しくまとまっている。

### `cms-types` — 生成型定義パッケージ

- `packages/cms` の `payload generate:types` が出力する `src/payload-types.ts` を置くためだけのパッケージ。`src/payload-types.ts` は生成物のため手で編集しない。
- `src/index.ts` は唯一の手書きファイルで、`payload-types.ts` の型を re-export する。`declare module "payload"` の module augmentation を `tsc` に有効なものとして認識させるには、同一プログラム内のどこかで `payload` から実在する型を参照する named type import が必要で、`src/index.ts` の `import type { Payload } from "payload"` がそのアンカーを兼ねている。
- 消費側(`cms`/`main`)からは `module-images-db/src` と同じ形で `cms-types/src` のサブパスからインポートする。

## 規約

- **1フォルダにつき1エクスポート、常に `index.ts`/`index.tsx`**: コンポーネント、util、const、type、style、hook などほぼすべての単位が、エクスポート対象の名前を持つ専用ディレクトリに配置され、中身は `index.ts(x)` のみとなっている。これはルートの `eslint.config.mjs` にある `sc-js/file-path-patterns` ESLint ルールで強制されており、設定ファイルなど一部のみが許可リストの例外となっている。新規ファイルを追加する際もこのパターンに従うこと。単独のファイルを並べて置かない。
- **テストのコロケーション(`main`/`module-images-db`)**: `index.test.ts` はテスト対象の `index.ts` の隣に置かれ、`bun:test`（`describe`/`it`/`expect`、しばしば `it.each` を使用）で書かれる。`cms` はこの規約の対象外で、結合テストは `tests/int/**/*.int.spec.ts`(Vitest)、E2E は `tests/e2e/**/*.e2e.spec.ts`(Playwright)に配置する(詳細は `packages/cms/README.md` の「テスト」節を参照)。
- **コミットメッセージ**: commitlint（`commitlint.config.ts`）によって、`commit-msg` の husky フック（`bun commitlint`）経由で強制される。Conventional Commits のタイプのみ許可: `chore|feat|fix|docs|style|refactor|test|revert`。`scope` は**必須**で、`root`、`*`、`packages`、またはワークスペースパッケージのディレクトリ名(現状 `module-images-db`、`main`、`cms`、`cms-types`)のいずれかでなければならない — `config/commitlint/dirs` を参照。例: `refactor(module-images-db): rename to PREFECTURES`。type/scope 以外の説明文(subject/body)は英語で書く(チャットでの応答等における日本語既定の例外。commitlint による機械的な強制は無いが、コミット履歴はこれまで英語で統一されている)。
- **品質ゲートは GitHub Actions**（`.github/workflows/check-code.yml`）: pull request と、`deploy-main.yml` からの `workflow_call`（`develop`/`main` への push）で走る。`dorny/paths-filter` で変更パスを判定し、影響のあるパッケージのジョブだけを実行する（共有資材 — `bun.lock`、ルート `package.json`、`bunfig.toml`、`tsconfig.json`、`config/**`、`.github/actions/**` — の変更時は全パッケージ）。`main` は `module-images-db` の変更でも走る(workspace 依存のため)。`cms`/`main` は `cms-types` の変更でも走る(いずれも `cms-types` に workspace 依存しているため)。ジョブは変更差分によってスキップされるため、branch protection の required status check には集約ジョブ `checked` を登録する。husky に残っているのは `commit-msg`（commitlint）のみで、push 時のローカルチェックは無い。
- **GitHub Actions の action はコミットハッシュで固定する**: tag ではなく SHA で指定し、行末コメントに `# v4.3.1` の形式でバージョンを添える。更新は手動。
- Lint は階層化されている: ルートの ESLint 設定はトップレベル/設定ファイルのみを対象とする（`eslint.config.mjs`、`ignores: ["packages"]`）。各パッケージは自身の `app/`/`src/` 用に独自の `eslint.config.js.mjs` を持ち、そのパッケージの `lint:product-code`/`lint:config` スクリプト経由で実行される。
- 整形は Prettier が担い、ESLint 側には整形ルールを持たせていない。各パッケージの `fix`/`lint` は `fix:prettier`/`lint:prettier` として ESLint とは別ステップで実行される。
- ロックファイルは Bun のテキスト形式ロックファイル `bun.lock` 単一構成。以前存在した `bun.lockb`/`yarn.lock` の併用構成は廃止されている。

## AI 間のファイルベース連携(ai-communication)

このリポジトリでは Claude Code が**設計・実装**、codex CLI が**レビュー**を担当する。両者は直接会話せず、リポジトリルートの `./ai-communication` 配下のファイルだけで受け渡しを行う。このディレクトリは git 管理外(`.gitignore` 済み)で、存在しなければ作成してよい。

### ファイルと権限

Claude Code 視点の権限は以下の通り。**読み取り専用のファイルには、書き込み・編集・削除・リネームのいずれも行わない。**

| ファイル                                 | Claude Code                                | codex CLI                                  |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| `ai-communication/task.md`               | 読み取りのみ                               | 読み取り禁止・書き込み禁止                 |
| `ai-communication/result_{timestamp}.md` | 新規作成して書く(既存ファイルは編集しない) | 読み取りのみ                               |
| `ai-communication/review_{timestamp}.md` | 読み取りのみ                               | 新規作成して書く(既存ファイルは編集しない) |

`{timestamp}` はファイル作成時刻を `YYYYMMDD-HHmmss`(ローカル時刻)で表したもの。例: `result_20260814-203015.md`。既存ファイルへの追記は行わず、常に新しい timestamp のファイルを作成する。

### フロー

1. タスクの入力を把握する。優先順位は「ユーザーからの直接指示 > 指定された issue > `ai-communication/task.md` の本文」。issue が指定された場合の扱いは下記「issue をタスク入力とする場合」を参照する。issue も `task.md` も無ければ従来通りユーザーの指示のみで進める
2. 設計・実装を行う。`.claude/rules/` の実装前確認ルール・コミットルール(ユーザー承認)はこれまで通り適用する。設計フェーズに入るかどうかの判定条件は下記「設計フェーズに入る条件」を参照する
3. **タスクが完了した時点で** `ai-communication/result_{timestamp}.md` を**新規作成**し、結果と申し送り事項を書く。作業途中の状態では作成しない(未レビューの result が複数並び、codex 側がレビュー対象を選べなくなるため)。途中経過の共有はチャットで行う。codex CLI の起動はユーザーが行う
4. ユーザーからレビュー到着を知らされたら、未対応の `ai-communication/review_*.md` を読む。未対応かどうかはファイル名の timestamp 順ではなく、各 review の `- reviewed_file:` が自分の直近の result を指しているかで判断する(timestamp は実際の作成順と前後することがある)
5. 各指摘の妥当性を自分で確認し、対応要否を判断する。修正が必要なものは実装前確認ルールに従って承認を得てから実装する。対応方法が別の既存規約(生成物を手で編集しない等)からの逸脱を伴う場合は、逸脱する旨・理由・代替案を明示してユーザーの承認を得る。技術的な妥当性を自分で検証できたこと(実環境での動作確認など)は、逸脱してよいという承認を得たことの代替にならない
6. 対応後に新しい `ai-communication/result_{timestamp}.md` を作成し、対応した指摘・見送った指摘とその理由・元になった review のファイル名を書く。以降 4〜6 を必要な回数だけ繰り返す
7. レビューの指摘が無くなったら `retrospective` agent を実行し、今回の作業プロセスを振り返る。agent は会話履歴を持たないため、承認フローの逸脱・手戻り・ユーザーからの指摘といった経緯メモを呼び出し時に渡す。ドキュメント反映が必要な項目が出た場合、起票の前に `gh issue list --repo akky-xxxx/project-homepage --state open --limit 1000 --json number,title,body,comments` で OPEN issue 全件の番号・タイトル・本文・コメントを取得し、類似issueの有無を確認する(既定の `--limit` は30件までしか取得できず、本文・コメントもタイトルのみの出力には含まれないため、いずれも明示する)。類似の判定は、反映先ファイル(`CLAUDE.md`/`AGENTS.md`/`.claude/rules/*` など)が一致し、かつ指摘している問題または提案する文言の趣旨が、本文だけでなく既存のコメント(過去にこの手順で追記統合された反映案を含む)とも重なるかで行う。類似issueが無ければ**別タスク(別ブランチ)として起票**し、類似issueがあれば新規issueは作らず、`gh issue comment <issue番号> --repo akky-xxxx/project-homepage` でその issue に今回の反映案(対象ファイル・追記文言案・理由・元タスクの1行要約)を追記コメントする。いずれの場合も現タスクの push はブロックしない。あわせて、これまでの result の `## 申し送り・レビュー観点` に「別 issue 候補」として書いた項目が起票・コメント追記のどちらも済んでいないまま残っていないか確認し、残っていれば同様に類似issue検索のうえ起票またはコメント追記する。ここでの「レビューの指摘が無くなったら」は、設計フェーズのサブループ(判断軸を変える変更の result/review)の解消ではなく、実装(Edit/Write)とその実装内容に対する result/review ループまで完了した、タスク全体としての解消を指す。設計フェーズを踏むタスクでは、設計サブループが指摘0件になった時点ではまだ実行しない。retrospective の実行契機は「レビューの指摘が無くなったら」に加えて「push の前には必ず」であり、再実行・事後実行が必要になる条件は下記「### retrospective の実行タイミング」を参照する。
8. push / PR 作成に進む。push はユーザーが実行する

### retrospective の実行タイミング

- retrospective 実行後、同じブランチへ新しいスコープが追加された場合: push 前に retrospective を再実行する。再実行は追加分のスコープに絞ってよく、既に起票済み・コメント追記済み・判断済みの項目を再掲しない
- retrospective の実行がユーザー操作待ちで中断した場合、またはユーザーの直接指示で push / PR 作成 / merge が先行した場合: 実行を省略せず事後に行う。呼び出し時の経緯メモに「push 等が先行した」ことを明記し、本来 push 前に行うはずだった「申し送りの別 issue 候補が起票・コメント追記のどちらも済んでいないかの確認」もあわせて行う

### 作成した result のチャットでの提示

`ai-communication/result_{timestamp}.md` を作成したターンでは、チャットの最終出力に作成したファイルを `ai-communication/result_20260814-203015.md` の形式で書く。ユーザーがそのままコピーして codex CLI にレビュー対象として渡せるようにするための表記であり、ディレクトリ名(`ai-communication/`)と拡張子(`.md`)のどちらも省略しない。手順3・手順6 のどちらで作成した場合も、設計フェーズで設計だけを書いた result の場合も同様に扱う。

### issue をタスク入力とする場合

タスクは GitHub issue で管理することを基本とする。`task.md` はローカルの git 管理外ファイルで作業デバイスに縛られるが、issue ならどのデバイスからでも起票・追記でき、着手前に内容を詰めておける。

- issue の指定は、ユーザーがチャットで issue 番号 / URL を渡す形と、`task.md` に issue の URL / 番号だけが書かれている形のどちらでもよい。後者の場合、`task.md` 本文は issue への参照とみなし、要件は issue 側を読む
- issue 番号のみ渡された場合は `gh issue view <issue 番号> --repo akky-xxxx/project-homepage` で参照する。issue の URL を渡された場合は URL 自体がリポジトリを一意に定めるため `gh issue view <URL>` をそのまま使う
- issue 本文が曖昧で複数の解釈が成り立つ場合は、自分で解釈を確定せず実装前確認ルールに従ってユーザーに確認する
- `ai-communication/result_{timestamp}.md` には issue 番号・URL を一切書かない。`- task:` 行に限らず、経緯説明やレビュー対応の記述であっても同様(過去の result に番号が残っていた、といった言及自体は許すが、その番号自体は書かない)。issue 本文の丸写しも行わない。codex に渡すのはレビューに必要な範囲の背景だけで、これは従来通り
- result を新規作成する前に、`- task:` 行だけでなく本文全体(`## 概要`・`## 申し送り・レビュー観点` 等の経緯説明を含む)に issue 番号・URL が紛れていないか見直す

codex には issue の id・本文のどちらも渡さない(`AGENTS.md` を参照)。背景情報を持たせないことで追認的なレビューになるのを避ける意図的な制約であり、issue で管理するようになってもこの前提は変えない。`result_{timestamp}.md` に issue 番号や URL を書くと、この前提が result 経由で崩れる。

### 設計フェーズに入る条件

手順2で、次のいずれかに当たる場合は、実装(Edit / Write)に着手する前に**設計だけ**を `ai-communication/result_{timestamp}.md` に出力し、codex の設計レビューが解消するまでコード・設定・ドキュメントに一切触らない。

- 以後の実装・レビューの判断軸になるもの(`CLAUDE.md` / `AGENTS.md` / `.claude/**` / `config/**` / CI 定義)を変更する。パスではなく検査基準・分類・実行条件・権限のいずれかを変えるかで判定し、既存基準に従うデータの更新(cspell 辞書への単語追加など)は含まない。「権限」には、CI のジョブ/ステップへの secrets・環境変数の追加・変更と、ワークフローの `permissions:` の変更を含む
- 複数パッケージにまたがる、または既存の公開インターフェース・データ構造を変える
- 判断軸や分類基準を新しく決める(どこまでを対象とするか、何を基準に分けるか)

変更行数・ファイル数・コード変更の有無は判定に使わない。ドキュメント1ファイルの追記でも上記に当たれば設計フェーズを踏む。

設計だけを書いた result は手順3 が禁じる「作業途中の result」には当たらない。`## 変更ファイル` には変更予定のファイルと適用後の文言を書く。Plan Mode のプランには、そのターンで実行する範囲(設計 result の作成までか、実装まで進むか)を明記する。

設計 result に対象ファイルの確定文言(markdown 等)を含める場合、リポジトリのファイルには触れずに、対象ファイルに実際に適用される整形ツールを ignore 設定(`.prettierignore`、`.ecrc`/`.editorconfig-checker.json` の `Exclude` 等)から先に判定する。適用されると判定したツールについてのみ、確定文言をスクラッチファイルへ書き出し、対象ファイルに適用されるのと同じ設定(`.editorconfig` 等)が有効になる状態で実行し、意図した構造(見出し階層、リストのネストなど)で解釈されることを確認する。あわせて、その設定自体が正しく再現できているかは確定文言側の結果だけでは裏取りできないため、変更前の対象ファイル本文も同じスクラッチファイル・同じ設定・同じツールで実行し、通ることを確認してから result を提出する。設計レビューが解消し確定文言をリポジトリのファイルへ適用した後は、適用に使ったコマンドの終了コード(exit code)だけを適用済みの根拠にせず、スクラッチファイルの確定文言と、適用後のファイルのうち対応する変更範囲(該当段落・該当行など)を `diff` で突き合わせ、差分が無いことを確認する。`## 確認済みのこと` には、スクラッチファイルの配置場所・適用した設定・実行したツールとコマンド(確定文言・変更前本文それぞれの結果、および適用後の突き合わせ結果)を書く。

設計対象が `result_{timestamp}.md` / `review_{timestamp}.md` の記述内容そのものを制約するルール(本節や次節の書式を変更する場合など)であるときは、そのうち起草中の設計 result 自身にも適用できる制約(禁止情報の不記載、記録すべき粒度など)は自己適用する。review 専用の書式(severity 見出し・固定ラベル・`reviewed_file`・件数サマリ等)のように result の形式に直接あてはめられない制約については、result をその形式に合わせるのではなく、提案内容が既存の制約や設計意図と整合しているかを点検する。直前の段落が定める整形・構造確認に加えて、ドラフト中の文言、`## 設計判断`、`## 確認済みのこと` の書き方がこれらの点検を満たしているかを提出前に確認し、修正可能な不整合は提出前に解消する。設計上解消できない、または適用可否が未確定な点だけを、禁止情報自体は転記せず理由とともに `## 申し送り・レビュー観点` に記録する。

設計 result にたたき台や過去の指示に含まれる文言(コマンド例、手順、事実主張)を採用する場合、内容の技術的な正しさの検証を省略しない。特にコマンドの既定挙動など、自分が同じセッション内で既に確認済みの知識と矛盾しないか照合し、矛盾があれば採用前に修正する。たたき台に書かれていることは、その内容が正しいことの根拠にならない。

### `result_{timestamp}.md` の書式

codex が機械的に読み取れるよう、以下の形式に統一する。ファイル参照は `path:line` 形式(コロン区切り、括弧なし)、絵文字・罫線などの装飾は使わない(`AGENTS.md` の指摘出力形式と揃えている)。

```markdown
- task: 対象タスクの1行要約
- reviewed_file: review_20260814-210000.md

## 概要

## 変更ファイル

## 設計判断

## 確認済みのこと

## 前回レビューへの対応

## 申し送り・レビュー観点
```

- `- task:`: 対象タスクの1行要約。issue が入力元であっても issue 番号 / URL は書かない(下記「issue をタスク入力とする場合」を参照)
- `- reviewed_file:`: 対応した review のファイル名。初回やレビュー起因でない場合は `-` とする
- `## 変更ファイル`: 変更した各ファイルのパスと変更内容を1行ずつ
- `## 設計判断`: 選んだ方針と、その理由・採らなかった選択肢
- `## 確認済みのこと`: 実行したコマンド(`bun ws:check-code` 等)とその結果
  - 自分がその場で実行できる検証は、result を提出する前に実行する。「未確認」と書いてよいのは、権限・環境・技術的制約により実行できないものに限り、その理由もあわせて書く。テストの失敗原因がローカル環境設定にある場合の申し送りへの記録は `.claude/rules/test.md` の個別規定に従う
  - 検査結果は実行した後に書く。結果を先に書いてから実行してはならない。該当有無は出力の有無ではなく終了コード(exit code)で判定し、マッチ0件(該当なし、`grep`/`rg` は通常 exit 1)と実行エラー(パス解決失敗等、exit 2 等)を区別する。実行エラーの場合は「該当なし」ではなく「実行エラー」として記録し、原因を解消してから再実行する
  - result を提出する直前に、対象ファイル・検索オプションを含む実行コマンドの形で、禁止対象の情報(issue 番号の実値、`#` 付き表記、issue URL 等)が本文全体(特定のフィールドに限らない、この記録行自体を含む)に含まれていないことを `grep`/`rg` 等で機械的に検査し、実行したコマンドと結果(該当有無)をここに書く。issue 番号の実値は、`#` 付き表記や URL に含まれる形だけでなく、前後に修飾語を伴わない単独の数字列としても出現しうるため、`#` 付き表記や URL の検索だけで代替せず、単語境界(`\b` 等)を使った実値単体の検索を必ず含める。単語境界は、無関係な数字列(タイムスタンプ・セッション ID 等)への誤検知を避ける目的も兼ねる
  - 検索パターンに禁止対象の実値(issue 番号そのもの等)や、`<secret 変数名>=` のような変数名を含むパターンを使う場合、記録するコマンドはパターン部分をプレースホルダ(例: `<issue番号>`、`<secret 変数名>`)に置き換え、結果(該当有無)のみを書く。理由は2つあり、実値をそのまま転記すると禁止対象自体を書き込んでしまうこと、および検査対象はこの記録行を含む result 全文であるため、パターンをそのまま書くと記録行自身がヒットしてしまうこと(変数名を含むパターンでも起きる)による。記録行のコマンド欄をプレースホルダで先に下書きすること自体は構わないが、結果欄(該当有無)は記録行を含む result 全文を書き終えたうえで検査を実行してから確定させる
- `## 前回レビューへの対応`: 2回目以降のみ。指摘ごとに「対応した / 見送った」と理由。見送りは必ず理由を書く
- `## 申し送り・レビュー観点`: 特に見てほしい箇所、既知の懸念、次のタスクへの引き継ぎ。技術的制約等を理由にテスト範囲や実装範囲を当初想定より絞った場合は、その判断と理由も含める

### やらないこと

- `ai-communication/task.md` および `ai-communication/review_*.md` への書き込み・編集・削除
- 既存の `ai-communication/result_*.md` の編集・追記(常に新規ファイルを作成する)
- 作業途中の状態で `ai-communication/result_*.md` を作成すること(手順2 の設計フェーズで作成する、設計だけを書いた result は該当しない)
- レビュー指摘を検証せずそのまま実装に反映すること(妥当性を自分で確認してから対応する)
- レビューの指摘が解消しないまま push / PR 作成に進むこと
