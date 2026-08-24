// payload-types.ts の `declare module "payload"` augmentation を tsc に有効な augmentation
// として認識させるには、同一プログラム内のどこかで "payload" を参照する import が必要
// (TS2664 回避のためのアンカー)。個別の型を import すると noUnusedLocals: true な消費側
// (main)で unused 判定されるため、何も import しない type-only import にしている。
import type {} from "payload"

export type * from "./payload-types"
