import { describe, expect, it, vi } from "vitest"

import { applyLoginOutcome } from "@/shared/utilities/applyLoginOutcome"

describe("applyLoginOutcome", () => {
  it("secondFactor なら onSecondFactorRequired だけを呼ぶ", () => {
    const onError = vi.fn()
    const onSecondFactorRequired = vi.fn()
    const onSuccess = vi.fn()

    applyLoginOutcome({ type: "secondFactor" }, { onError, onSecondFactorRequired, onSuccess })

    expect(onSecondFactorRequired).toHaveBeenCalledOnce()
    expect(onError).not.toHaveBeenCalled()
    expect(onSuccess).not.toHaveBeenCalled()
  })

  it("error なら onError だけをメッセージ付きで呼ぶ", () => {
    const onError = vi.fn()
    const onSecondFactorRequired = vi.fn()
    const onSuccess = vi.fn()

    applyLoginOutcome(
      { message: "invalid", type: "error" },
      { onError, onSecondFactorRequired, onSuccess },
    )

    expect(onError).toHaveBeenCalledExactlyOnceWith("invalid")
    expect(onSecondFactorRequired).not.toHaveBeenCalled()
    expect(onSuccess).not.toHaveBeenCalled()
  })

  it("success なら onSuccess だけを呼ぶ", () => {
    const onError = vi.fn()
    const onSecondFactorRequired = vi.fn()
    const onSuccess = vi.fn()

    applyLoginOutcome({ type: "success" }, { onError, onSecondFactorRequired, onSuccess })

    expect(onSuccess).toHaveBeenCalledOnce()
    expect(onError).not.toHaveBeenCalled()
    expect(onSecondFactorRequired).not.toHaveBeenCalled()
  })
})
