/**
 * @description
 * ギャラリー系の一覧取得 API に渡す基本のクエリパラメータ。
 * `draft`/`trash` を明示的に `false` に固定し、CMS 側の設定変更で
 * 下書き・ゴミ箱のデータが公開サイトに意図せず露出しないようにしている。
 * 呼び出し側の options とマージする際、同名キーがあれば options 側の値で上書きされる。
 */
const BASE_SEARCH_PARAMETERS = {
  depth: 2,
  draft: false,
  limit: 0,
  trash: false,
} as const

export const createUrl = (
  pathname: string,
  additionalSearchParameters: Record<string, unknown> = {},
) => {
  const searchParameters = new URLSearchParams()
  Object.entries({ ...BASE_SEARCH_PARAMETERS, ...additionalSearchParameters }).forEach(
    ([key, value]) => {
      searchParameters.set(key, String(value))
    },
  )
  return [pathname, searchParameters.toString()].join("?")
}
