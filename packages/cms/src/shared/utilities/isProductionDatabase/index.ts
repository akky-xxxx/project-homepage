// IPv6 は URL.hostname が角括弧付きで返すため、その表記で持つ
const LOCAL_HOSTNAMES = new Set(["127.0.0.1", "[::1]", "localhost"])

/**
 * 接続先がローカルの Postgres でないかを判定する。
 * ローカルから本番 DB へ繋いで作業していることを管理画面に表示するために使う。
 * 解析できない接続文字列は、安全側に倒して本番扱いとする。
 * @param postgresUrl Postgres の接続文字列
 * @returns ローカル以外に接続していれば true
 */
export const isProductionDatabase = (postgresUrl: string): boolean => {
  try {
    const { hostname } = new URL(postgresUrl)

    return !LOCAL_HOSTNAMES.has(hostname)
  } catch {
    return true
  }
}
