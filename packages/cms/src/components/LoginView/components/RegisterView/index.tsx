import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

import { RegisterForm } from "./components/RegisterForm"

type RegisterViewProps = {
  onNavigateToSignIn: () => void
}

/**
 * 最初の 1 アカウントを作るためだけのブートストラップ用サインアップ画面。
 * サーバー側の `assertSignUpAllowed` が既に閉じているため、あえて目立たせない。
 * @param props コールバック(サインイン画面へ戻る)
 * @returns サインアップ画面
 */
export const RegisterView = (props: RegisterViewProps) => {
  const { onNavigateToSignIn } = props

  return (
    <div style={LOGIN_VIEW_STYLES.card}>
      <h1>Create the first admin account</h1>

      <RegisterForm />

      <button style={LOGIN_VIEW_STYLES.link} type="button" onClick={onNavigateToSignIn}>
        Back
      </button>
    </div>
  )
}
