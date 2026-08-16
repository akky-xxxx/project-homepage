"use client"

import { LOGIN_VIEW_STYLES } from "@/shared/const/LOGIN_VIEW_STYLES"

import type { JSX } from "react"

type ErrorBannerProps = {
  message: string | null
}

/**
 * エラーメッセージがあれば表示するバナー。無ければ何も描画しない。
 * @param props 表示するメッセージ
 * @param props.message エラーメッセージ。null なら何も描画しない
 * @returns エラーバナー、または null
 */
export const ErrorBanner = ({ message }: ErrorBannerProps): JSX.Element | null => {
  if (message === null) return null

  return (
    <div role="alert" style={LOGIN_VIEW_STYLES.errorBanner}>
      {message}
    </div>
  )
}
