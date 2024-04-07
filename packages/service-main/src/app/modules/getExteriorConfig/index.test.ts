import { getExteriorConfig } from "./index"

import type { ExteriorConfig } from "../../../shared/types/ExteriorConfig"
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"

describe("app/modules/getExteriorConfig", () => {
  it.each<[ReturnType<RequestCookies["get"]>, ExteriorConfig]>([
    [undefined, { isDarkMode: false, isManual: false }],
    [
      { name: "", value: JSON.stringify({ property: 0 }) },
      { isDarkMode: false, isManual: false },
    ],
    [
      { name: "", value: JSON.stringify({ isDarkMode: true, isManual: true }) },
      { isDarkMode: true, isManual: true },
    ],
  ])("引数に「%s」を渡すと「%o」を返す", (input, expectedValue) => {
    expect(getExteriorConfig(input)).toStrictEqual(expectedValue)
  })
})
