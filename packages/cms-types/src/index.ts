// payload-types.ts の `declare module "payload"` augmentation を tsc に有効な augmentation
// として認識させるには、同一プログラム内のどこかで "payload" から実在する型を参照する
// named type import が必要(TS2664 回避のためのアンカー)。
import type { Payload } from "payload"

export type * from "./payload-types"
