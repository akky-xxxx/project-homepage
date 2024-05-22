import { css } from "hono/css"

import { Spaces } from "@shared/styles/Spaces"

import type { ConditionComponentProps } from "../../types/ConditionComponentProps"
import type { FC } from "hono/jsx"

const { SPACE04, SPACE12 } = Spaces

type ListItemProps = ConditionComponentProps["items"][number] &
  Pick<ConditionComponentProps, "isMultiple" | "name">

const ListItem: FC<ListItemProps> = (props) => {
  const { checked, display, isMultiple, name, value } = props
  const type = isMultiple ? "checkbox" : "radio"

  return (
    <li>
      <label class={labelStyle}>
        <input checked={checked} name={name} type={type} value={value} />
        <span>{display}</span>
      </label>
    </li>
  )
}

export const ConditionList: FC<ConditionComponentProps> = (props) => {
  const { name, isMultiple, items } = props
  return (
    <ul className={ulStyle}>
      {!isMultiple && <ListItem checked={false} display="選択してください" name={name} value="" />}
      {items.map((item) => {
        const { checked, display, value } = item
        return <ListItem checked={checked} display={display} isMultiple={isMultiple} name={name} value={value} />
      })}
    </ul>
  )
}

const ulStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACE12}rem;
`
const labelStyle = css`
  display: flex;
  gap: ${SPACE04}rem;
`
