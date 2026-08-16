import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

type AuthBannerProps = {
  kind: "error" | "success"
  message: string
}

/**
 * `LoginView` 配下で共有するエラー/成功バナー。
 * @param props 種別とメッセージ
 * @returns バナー
 */
export const AuthBanner = (props: AuthBannerProps) => {
  const { kind, message } = props
  const isError = kind === "error"

  return (
    <div
      aria-live={isError ? "assertive" : "polite"}
      role={isError ? "alert" : "status"}
      style={isError ? LOGIN_VIEW_STYLES.errorBanner : LOGIN_VIEW_STYLES.successBanner}
    >
      {message}
    </div>
  )
}
