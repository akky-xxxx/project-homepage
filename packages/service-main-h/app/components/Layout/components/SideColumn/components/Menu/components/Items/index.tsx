import { cx } from "hono/css"

import { anchorStyle } from "./styles/anchorStyle"
import { itemStyle } from "../styles/itemStyle"

import type { FC } from "hono/jsx"

type Props = {
  items: Array<Record<"href" | "item", string>>
}

export const Items: FC<Props> = (props) => {
  const { items } = props

  return (
    <ul>
      {items.map((record) => {
        const { item, href } = record
        return (
          <li key={item}>
            <a class={cx(itemStyle, anchorStyle)} href={href}>
              {item}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
