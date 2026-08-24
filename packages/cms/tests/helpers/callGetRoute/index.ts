import { GET } from "@/app/(payload)/api/[...slug]/route"

/**
 * REST の GET ハンドラ(src/app/(payload)/api/[...slug]/route.ts)を直接呼び出す。
 * 実サーバーを起動せずに、Authorization ヘッダー等を含む実際の REST 認証を検証するために使う。
 * @param slug `/api/` 以降のパスセグメント(例: ["gallery-areas"]、["gallery-photos", "months"])
 * @param init 付与する headers 等(fetch の RequestInit と同じ)
 * @returns REST ハンドラのレスポンス
 */
export const callGetRoute = (slug: string[], init?: RequestInit): Promise<Response> =>
  GET(new Request(`http://localhost:3000/api/${slug.join("/")}`, init), {
    params: Promise.resolve({ slug }),
  })
