import { Button } from "@payloadcms/ui"

import { RegisterForm } from "./components/RegisterForm"

type RegisterViewProps = {
  onNavigateToSignIn: () => void
}

/**
 * 最初の 1 アカウントを作るためだけのブートストラップ用サインアップ画面。
 * サーバー側の `assertSignUpAllowed` が既に閉じているため、あえて目立たせない。
 * 縦の間隔は Payload の `.login-fields` が持つ gap に任せる。
 * @param props コールバック(サインイン画面へ戻る)
 * @returns サインアップ画面
 */
export const RegisterView = (props: RegisterViewProps) => {
  const { onNavigateToSignIn } = props

  return (
    <div className="login-fields">
      <h1>Create the first admin account</h1>

      <RegisterForm />

      <Button buttonStyle="none" margin={false} onClick={onNavigateToSignIn}>
        Back
      </Button>
    </div>
  )
}
