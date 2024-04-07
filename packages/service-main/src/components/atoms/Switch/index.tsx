import { cx } from "@panda/css"

import { inputStyle } from "./styles/inputStyle"
import { labelStyle } from "./styles/labelStyle"
import { switchStyle } from "./styles/switchStyle"

import type { FC } from "react"

type Props = {
  isChecked: boolean
  isDisabled?: boolean
  handleChange: () => void
  label?: string
}

export const Switch: FC<Props> = (props) => {
  const { isChecked, isDisabled, handleChange, label } = props

  return (
    <label className={labelStyle}>
      <input
        checked={isChecked}
        className={cx("peer", inputStyle)}
        disabled={isDisabled}
        type="checkbox"
        onChange={handleChange}
      />
      <div className={switchStyle} />
      {label ? <span>{label}</span> : null}
    </label>
  )
}
