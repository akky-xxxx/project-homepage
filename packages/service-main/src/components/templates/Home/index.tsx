"use client"

import { useState } from "react"

import { View } from "./View"

import type { FC } from "react"

export const Home: FC = () => {
  const [isChecked, setIsChecked] = useState(false)
  const handleChangeSwitch = () => {
    setIsChecked((current) => !current)
  }

  return <View handleChange={handleChangeSwitch} isChecked={isChecked} />
}
