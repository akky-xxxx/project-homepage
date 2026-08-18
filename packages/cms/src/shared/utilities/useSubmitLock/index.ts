"use client"

import { useCallback, useRef, useState } from "react"

type SubmitLock = {
  isSubmitting: boolean
  runExclusive: (task: () => Promise<void>) => Promise<void>
}

/**
 * 送信処理の多重実行を防ぐ。
 *
 * Payload の `Form` は `onSubmit` の非同期処理を待たず、呼び出した直後に processing/disabled を
 * 解除する(`@payloadcms/ui` の `dist/forms/Form/index.js`)。そのため送信ボタンの無効化だけでは
 * 応答待ちの間の再送を止められない。state は再描画を経てからしか反映されないため、
 * 同期的に判定できる ref のロックを別に持ち、表示用の `isSubmitting` と役割を分ける。
 * @returns 表示用の送信中フラグと、多重実行を弾く実行関数
 */
export const useSubmitLock = (): SubmitLock => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)

  const runExclusive = useCallback(async (task: () => Promise<void>): Promise<void> => {
    if (isSubmittingRef.current) return

    isSubmittingRef.current = true
    setIsSubmitting(true)

    try {
      await task()
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }, [])

  return { isSubmitting, runExclusive }
}
