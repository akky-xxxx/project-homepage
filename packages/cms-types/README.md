# cms-types

`packages/cms` の `payload generate:types` が出力する型定義(`src/payload-types.ts`)を置くためのパッケージ。`src/payload-types.ts` は生成物のため手で編集しない。再生成は `packages/cms` 側で `bun generate:types` を実行する。

`src/index.ts` は手書きの唯一のファイルで、`payload-types.ts` の型を re-export する。`declare module "payload"` の module augmentation を `tsc` に有効なものとして認識させるため、`payload` から実在する型を参照する named type import(`import type { Payload } from "payload"`)を読み込むアンカーを兼ねている(空の `import type {}` でも解決はするが、実在する型を参照する named import の方が意図が伝わりやすいため採用している)。

消費側(`packages/cms`)からは `cms-types/src` のサブパスで import する(`module-images-db/src` と同じ形)。
