import { format } from "@formkit/tempo"
import { cx } from "hono/css"
import { Months, Locations, Tags } from "module-images-db/src"

import { TextWithIcon } from "@atoms/TextWithIcon"
import { AboutIcon } from "@icons/AboutIcon"
import { AllIcon } from "@icons/AllIcon"
import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { PhotoIcon } from "@icons/PhotoIcon"
import { ProfileIcon } from "@icons/ProfileIcon"
import { TagIcon } from "@icons/TagIcon"
import { TempoFormats } from "@shared/const/TempoFormats"
import { getHref } from "@shared/utils/getHref"

import { Accordion } from "./components/Accordion"
import { Items } from "./components/Items"
import { anchorStyle } from "./components/Items/styles/anchorStyle"
import { itemStyle } from "./components/styles/itemStyle"
import { menuStyle } from "./styles/menuStyle"

import type { FilterQueries } from "@shared/types/FilterQueries"
import type { FC } from "hono/jsx"

const IconProps = {
  height: 20,
  width: 20,
} as const

type Props = FilterQueries

export const Menu: FC<Props> = (props) => {
  const { date, location, tag } = props
  const locationItems = Locations.map((location) => ({
    href: getHref({ id: "PhotoLocationDetail", location }),
    item: location,
  }))
  const tagItems = Tags.map((tag) => ({
    href: getHref({ id: "PhotoTagDetail", tag }),
    item: tag,
  }))
  const monthItems = Months.map((month) => ({
    href: getHref({ date: month, id: "PhotoDateDetail" }),
    item: format(month, TempoFormats.YYYY年M月),
  }))
  return (
    <menu class={menuStyle} type="toolbar">
      <li>
        <Accordion isOpen icon={<PhotoIcon {...IconProps} />} title="Photo Gallery">
          <ul>
            <li>
              <a class={cx(itemStyle, anchorStyle)} href={getHref({ id: "PhotoGallery" })}>
                <TextWithIcon icon={<AllIcon {...IconProps} />}>All</TextWithIcon>
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
              <Accordion icon={<TagIcon {...IconProps} />} isOpen={Boolean(tag)} title="Tags">
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
      </li>
      <li>
        <a class={cx(itemStyle, anchorStyle)} href={getHref({ id: "Profile" })}>
          <TextWithIcon icon={<ProfileIcon {...IconProps} />}>Profile</TextWithIcon>
        </a>
      </li>
      <li>
        <a class={cx(itemStyle, anchorStyle)} href={getHref({ id: "About" })}>
          <TextWithIcon icon={<AboutIcon {...IconProps} />}>About</TextWithIcon>
        </a>
      </li>
    </menu>
  )
}
