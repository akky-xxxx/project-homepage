import { useState } from "hono/jsx"
import Cookie from "js-cookie"

import { CookieKeys } from "@shared/const/CookieKeys"
import { ExteriorModes } from "@shared/const/ExteriorModes"

import type { Props } from "../../types/Props"
import type { ExteriorMode } from "@shared/types/ExteriorMode"

const { Dark, Light } = ExteriorModes

type UseExteriorSwitchProps = {
  exteriorMode: ExteriorMode
}
type UseExteriorSwitch = (props: UseExteriorSwitchProps) => Props

export const useExteriorSwitch: UseExteriorSwitch = (props) => {
  const { exteriorMode } = props
  const [isChecked, setIsChecked] = useState(exteriorMode === Dark)
  const handleChange = () => {
    const newCookieValue = isChecked ? Light : Dark
    Cookie.set(CookieKeys.ExteriorMode, newCookieValue)
    setIsChecked((currentState) => !currentState)
  }

  return { handleChange, isChecked }
}
