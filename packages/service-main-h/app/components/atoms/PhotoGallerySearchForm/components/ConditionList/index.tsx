import { inputStyle } from "./styles/inputStyle"
import { labelStyle } from "./styles/labelStyle"
import { rootStyle } from "./styles/rootStyle"

import type { ConditionComponentProps } from "../../types/ConditionComponentProps"
import type { FC } from "hono/jsx"

type ListItemProps = ConditionComponentProps["items"][number] &
  Pick<ConditionComponentProps, "isMultiple" | "name"> & {
    key?: string
  }

const ListItem: FC<ListItemProps> = (props) => {
  const { checked, display, isMultiple = false, name, value } = props
  const type = isMultiple ? "checkbox" : "radio"

  return (
    <li>
      <label class={labelStyle}>
        <input checked={checked} class={inputStyle} name={name} type={type} value={value} />
        <span>{display}</span>
      </label>
    </li>
  )
}

export const ConditionList: FC<ConditionComponentProps> = (props) => {
  const { name, isMultiple = false, items } = props
  return (
    <ul className={rootStyle}>
      {!isMultiple && <ListItem checked={false} display="選択してください" name={name} value="" />}
      {items.map((item) => {
        const { checked, display, value } = item
        return (
          <ListItem
            key={value}
            checked={checked}
            display={display}
            isMultiple={isMultiple}
            name={name}
            value={value}
          />
        )
      })}
    </ul>
  )
}
