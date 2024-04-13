import { cx } from "hono/css"

import { anchorStyle } from "./styles/anchorStyle"
import { itemStyle } from "../styles/itemStyle"

import type { FC } from "hono/jsx"

type Props = {
  items: string[]
}

export const Items: FC<Props> = (props) => {
  const { items } = props

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
          <a className={cx(itemStyle, anchorStyle)} href="/">
            {item}
          </a>
        </li>
      ))}
    </ul>
  )
}
