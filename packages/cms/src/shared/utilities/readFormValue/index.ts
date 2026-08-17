/**
 * Payload の form state からフィールドの文字列値を取り出す。
 * `FieldState.value` は `unknown` 型で、未入力のフィールドでは `undefined` になるため、
 * 型アサーションを使わずに絞り込むための薄いヘルパー。
 * @param value form state 上のフィールド値(`fields.<path>.value`)
 * @returns 文字列。文字列以外(未入力時の `undefined` 等)は空文字
 */
export const readFormValue = (value: unknown): string => (typeof value === "string" ? value : "")
