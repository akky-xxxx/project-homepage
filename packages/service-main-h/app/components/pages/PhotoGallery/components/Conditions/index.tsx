import { Block } from "@atoms/Block"
import { css } from "@panda/css"

import { getConditionData } from "./modules/getConditionData"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { FC } from "hono/jsx"

type Props = {
  filterQueries: FilterQueries
}

export const Conditions: FC<Props> = (props) => {
  const { filterQueries } = props
  const conditionData = getConditionData(filterQueries)
  // TODO: early return に適した値が型上ないための回避策
  // eslint-disable-next-line react/jsx-fragments, react/jsx-no-useless-fragment
  if (!conditionData.length) return <></>

  return (
    <Block>
      <p className={conditionStyle}>
        <span>検索条件：</span>
        {conditionData.map((record) => record)}
      </p>
    </Block>
  )
}

const conditionStyle = css({
  alignItems: "center",
  columnGap: "{spacing.s04}",
  display: "inline-flex",
  fill: "var(--primary-color)",
  flexWrap: "wrap",
})
