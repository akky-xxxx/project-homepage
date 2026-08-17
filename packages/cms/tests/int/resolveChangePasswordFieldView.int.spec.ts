import { describe, expect, it } from "vitest"

import { resolveChangePasswordFieldView } from "@/shared/utilities/resolveChangePasswordFieldView"

const OWN_DOCUMENT_ID = 1
const OTHER_DOCUMENT_ID = 2

describe("resolveChangePasswordFieldView", () => {
  it("セッションユーザーが未取得(undefined)なら、自分のドキュメントでも何も描画しない", () => {
    expect(resolveChangePasswordFieldView({ documentId: OWN_DOCUMENT_ID, userId: undefined })).toBe(
      "hidden",
    )
  })

  it("セッションユーザーが未取得(null)なら、自分のドキュメントでも何も描画しない", () => {
    expect(resolveChangePasswordFieldView({ documentId: OWN_DOCUMENT_ID, userId: null })).toBe(
      "hidden",
    )
  })

  it("新規作成画面(documentId 不在)では何も描画しない", () => {
    expect(resolveChangePasswordFieldView({ documentId: undefined, userId: OWN_DOCUMENT_ID })).toBe(
      "hidden",
    )
  })

  it("documentId とセッションユーザーの両方が不在でも何も描画しない", () => {
    expect(resolveChangePasswordFieldView({ documentId: undefined, userId: undefined })).toBe(
      "hidden",
    )
  })

  it("id が一致するならフォームを描画する", () => {
    expect(
      resolveChangePasswordFieldView({ documentId: OWN_DOCUMENT_ID, userId: OWN_DOCUMENT_ID }),
    ).toBe("form")
  })

  it("id が number と string で混在していても、値が同じならフォームを描画する", () => {
    expect(
      resolveChangePasswordFieldView({
        documentId: OWN_DOCUMENT_ID,
        userId: String(OWN_DOCUMENT_ID),
      }),
    ).toBe("form")
    expect(
      resolveChangePasswordFieldView({
        documentId: String(OWN_DOCUMENT_ID),
        userId: OWN_DOCUMENT_ID,
      }),
    ).toBe("form")
  })

  it("id が一致しないならプレースホルダを描画する", () => {
    expect(
      resolveChangePasswordFieldView({ documentId: OTHER_DOCUMENT_ID, userId: OWN_DOCUMENT_ID }),
    ).toBe("notOwner")
  })
})
