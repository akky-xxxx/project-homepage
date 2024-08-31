import { format } from "@formkit/tempo"
import { cx } from "hono/css"
import { Locations, Months, Tags } from "module-images-db/src"

import { TextWithIcon } from "@atoms/TextWithIcon"
import { AllIcon } from "@icons/AllIcon"
import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { PhotoIcon } from "@icons/PhotoIcon"
import { SearchIcon } from "@icons/SearchIcon"
import { TagIcon } from "@icons/TagIcon"
import { TempoFormats } from "@shared/const/TempoFormats"
import { getHref } from "@shared/utils/getHref"

import { Accordion } from "../Accordion"
import { Items } from "../Items"
import { anchorStyle } from "../Items/styles/anchorStyle"
import { itemStyle } from "../styles/itemStyle"

import type { PhotoGallerySearchQueries } from "@shared/types/PhotoGallerySearchQueries"
import type { FC } from "hono/jsx"

const IconProps = {
  height: 20,
  width: 20,
} as const

type Props = PhotoGallerySearchQueries

// これ以上分割すると分かりづらくなる
// eslint-disable-next-line max-lines-per-function
export const PhotoGalleryMenu: FC<Props> = (props) => {
  const { date, location, tag } = props
  const locationItems = Locations.map((item) => ({
    href: getHref({ id: "PhotoLocationDetail", location: item }),
    item,
  }))
  const tagItems = Tags.map((item) => ({
    href: getHref({ id: "PhotoTagDetail", tag: [item] }),
    item,
  }))
  const monthItems = Months.map((item) => ({
    href: getHref({ date: item, id: "PhotoDateDetail" }),
    item: format(item, TempoFormats.YYYY年M月),
  }))

  return (
    <Accordion isOpen icon={<PhotoIcon {...IconProps} />} title="Photo Gallery">
      <ul>
        <li>
          <a class={cx(itemStyle, anchorStyle)} href={getHref({ id: "PhotoGallery" })}>
            <TextWithIcon icon={<AllIcon {...IconProps} />}>All</TextWithIcon>
          </a>
        </li>
        <li>
          <a class={cx(itemStyle, anchorStyle)} href={getHref({ id: "Search" })}>
            <TextWithIcon icon={<SearchIcon {...IconProps} />}>Search</TextWithIcon>
          </a>
        </li>
        <li>
          <Accordion
            icon={<LocationIcon {...IconProps} />}
            isOpen={Boolean(location)}
            title="Locations"
          >
            <Items items={locationItems} />
          </Accordion>
        </li>

        <li>
          <Accordion
            icon={<TagIcon {...IconProps} />}
            isOpen={Boolean(tag?.length)}
            title="Tags"
          >
            <Items items={tagItems} />
          </Accordion>
        </li>

        <li>
          <Accordion icon={<DateIcon {...IconProps} />} isOpen={Boolean(date)} title="Dates">
            <Items items={monthItems} />
          </Accordion>
        </li>
      </ul>
    </Accordion>
  )
}
