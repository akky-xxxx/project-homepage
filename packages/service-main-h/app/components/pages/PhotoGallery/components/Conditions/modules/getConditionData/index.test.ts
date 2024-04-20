import { describe, it, expect } from "bun:test"

import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { TagIcon } from "@icons/TagIcon"

import { getConditionData } from "."

describe("getConditionData", () => {
  it.each([
    [{ location: "location value" }, LocationIcon, "location value"],
    [{ date: "date value" }, DateIcon, "date value"],
    [{ tag: "tag value" }, TagIcon, "tag value"],
  ] as const)("引数が「%o」の時、[%o, %s]を返す", (input, component, text) => {
    const result = getConditionData(input)
    // @ts-expect-error TODO: 型解決できない
    expect(result[0].tag).toStrictEqual(component)
    expect(result[1]).toBe(text)
  })

  it("引数が複数プロパティの時、プロパティ分の配列を返す", () => {
    const input = {
      location: "location value",
      date: "date value",
      tag: "tag value",
    } as const
    const result = getConditionData(input)
    // @ts-expect-error TODO: 型解決できない
    expect(result[0].tag).toStrictEqual(LocationIcon)
    expect(result[1]).toBe("location value")
    // @ts-expect-error TODO: 型解決できない
    expect(result[2].tag).toStrictEqual(DateIcon)
    expect(result[3]).toBe("date value")
    // @ts-expect-error TODO: 型解決できない
    expect(result[4].tag).toStrictEqual(TagIcon)
    expect(result[5]).toBe("tag value")
  })
})
