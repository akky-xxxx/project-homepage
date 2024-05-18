import { format } from "@formkit/tempo"
import { css } from "hono/css"

import { Block } from "@atoms/Block"
import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { TagIcon } from "@icons/TagIcon"
import { TempoFormats } from "@shared/const/TempoFormats"

import type { PhotoGallerySearchKey } from "app/shared/types/PhotoGallerySearchKey"
import type { FC, Child } from "hono/jsx"

const FullDigitDate = 10

const getConditionData = (searchQueries: Props["searchQueries"]) => {
  const { date, location, tag } = searchQueries
  const baseArray: Child | string = []

  if (location) {
    baseArray.push([<LocationIcon />, location])
  }

  if (date) {
    const formatName = date.length === FullDigitDate ? "YYYY年M月D日" : "YYYY年M月"
    baseArray.push([<DateIcon />, format(date, TempoFormats[formatName])])
  }

  if (tag) {
    baseArray.push([<TagIcon />, tag])
  }

  return baseArray.flat()
}

type Props = {
  searchQueries: Partial<Record<PhotoGallerySearchKey, string>>
}

export const Conditions: FC<Props> = (props) => {
  const { searchQueries } = props
  const conditionData = getConditionData(searchQueries)
  // TODO: early return に適した値が型上ないための回避策
  // eslint-disable-next-line react/jsx-fragments, react/jsx-no-useless-fragment
  if (!conditionData.length) return <></>

  return (
    <Block>
      <p class={conditionStyle}>
        <span>検索条件：</span>
        {conditionData.map((record) => record)}
      </p>
    </Block>
  )
}

const conditionStyle = css`
  display: inline-flex;
  flex-wrap: wrap;
  column-gap: 4px;
  align-items: center;
  fill: var(--primary-color);
`
