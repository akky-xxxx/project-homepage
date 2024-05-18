import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

import type { ConditionComponentProps } from "../../types/ConditionComponentProps"
import type { FC } from "hono/jsx"

const { SPACE12 } = Spaces

export const ConditionSelect: FC<ConditionComponentProps> = (props) => {
  const { name, isMultiple, items } = props
  return (
    <select className={selectStyle} multiple={isMultiple} name={name}>
      {!isMultiple && <option value="">選択してください</option>}
      {items.map((item) => {
        const { display, value } = item
        return <option value={value}>{display}</option>
      })}
    </select>
  )
}

const selectStyle = css`
  width: 100%;
  padding: ${SPACE12}rem;

  option {
    padding: ${SPACE12}rem;
  }
`
