/**
 * `ConfirmPasswordField`(`@payloadcms/ui`)が既定で使うフォーム state 上のパス。
 * 同コンポーネントの検証(`payload/shared` の `confirmPassword`)は `siblingData.password` と
 * 突き合わせるため、対になる新パスワード側のパスは `"password"` に固定する必要がある。
 */
export const CONFIRM_PASSWORD_PATH = "confirm-password"
