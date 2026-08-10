import { ENVIRONMENT } from "@/shared/const/ENVIRONMENT"
import { isProductionDatabase } from "@/shared/utilities/isProductionDatabase"

/**
 * ローカルから本番 DB へ繋いで作業しているときに、管理画面へ警告を表示する。
 * この状態では削除・編集がそのまま本番へ反映されるため、気づけるようにしておく。
 * @returns 本番 DB 接続中の警告バナー(ローカル DB 接続時は何も描画しない)
 */
export const ProductionDatabaseBanner = () => {
  if (!isProductionDatabase(ENVIRONMENT.DB_POSTGRES_URL)) return null

  return (
    <div
      role="alert"
      style={{
        background: "#7f1d1d",
        borderRadius: "4px",
        color: "#fff",
        fontWeight: 700,
        marginBottom: "1rem",
        padding: "0.75rem",
      }}
    >
      本番 DB に接続中 — 変更は即座に本番へ反映されます
    </div>
  )
}
