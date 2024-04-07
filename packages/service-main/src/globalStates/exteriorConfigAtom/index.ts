import { atomWithStorage, createJSONStorage } from "jotai/utils"
import Cookies from "js-cookie"

import { CookieKeys } from "../../shared/constants/CookieKeys"
import { DefaultExteriorConfig } from "../../shared/constants/DefaultExteriorConfig"

import type { ExteriorConfig } from "../../shared/types/ExteriorConfig"

const syncCookie = createJSONStorage<ExteriorConfig>(() => ({
  getItem: (key) => Cookies.get(key) || null,
  removeItem: (key) => {
    Cookies.remove(key)
  },
  setItem: (key, newValue) => {
    Cookies.set(key, newValue)
  },
}))

export const exteriorConfigAtom = atomWithStorage<ExteriorConfig>(
  CookieKeys.EXTERIOR_CONFIG,
  DefaultExteriorConfig,
  syncCookie,
)
