"use client"

import { useSetAtom } from "jotai"
import { useEffect } from "react"

import { exteriorConfigAtom } from "../../../../globalStates/exteriorConfigAtom"

import type { ExteriorConfig } from "../../../../shared/types/ExteriorConfig"
import type { FC } from "react"

type Props = ExteriorConfig

export const ExteriorConfigSetter: FC<Props> = (props) => {
  const { isDarkMode, isManual } = props
  const setExteriorConfig = useSetAtom(exteriorConfigAtom)

  useEffect(() => {
    setExteriorConfig({ isDarkMode, isManual })
  }, [isDarkMode, isManual, setExteriorConfig])

  return null
}
