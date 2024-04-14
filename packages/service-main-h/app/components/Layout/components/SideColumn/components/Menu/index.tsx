import { cx } from "hono/css"
import { Months, Locations, Tags } from "module-images-db/src"

import { TextWithIcon } from "@atoms/TextWithIcon"
import { AllIcon } from "@icons/AllIcon"
import { DateIcon } from "@icons/DateIcon"
import { LocationIcon } from "@icons/LocationIcon"
import { PhotoIcon } from "@icons/PhotoIcon"
import { ProfileIcon } from "@icons/ProfileIcon"
import { TagIcon } from "@icons/TagIcon"
import { getHref } from "@shared/utils/getHref"

import { Accordion } from "./components/Accordion"
import { Items } from "./components/Items"
import { anchorStyle } from "./components/Items/styles/anchorStyle"
import { itemStyle } from "./components/styles/itemStyle"
import { menuStyle } from "./styles/menuStyle"

import type { FC } from "hono/jsx"

const IconProps = {
  height: 20,
  width: 20,
} as const

export const Menu: FC = () => (
  <menu className={menuStyle} type="toolbar">
    <li>
      <Accordion isOpen icon={<PhotoIcon {...IconProps} />} title="Photo Gallery">
        <ul>
          <li>
            <a className={cx(itemStyle, anchorStyle)} href={getHref({ id: "PhotoGallery" })}>
              <TextWithIcon icon={<AllIcon {...IconProps} />}>All</TextWithIcon>
            </a>
          </li>
          <li>
            <Accordion icon={<LocationIcon {...IconProps} />} title="Locations">
              <Items items={Locations} />
            </Accordion>
          </li>

          <li>
            <Accordion icon={<TagIcon {...IconProps} />} title="Tags">
              <Items items={Tags} />
            </Accordion>
          </li>

          <li>
            <Accordion icon={<DateIcon {...IconProps} />} title="Dates">
              <Items items={Months} />
            </Accordion>
          </li>
        </ul>
      </Accordion>
    </li>
    <li>
      <a className={cx(itemStyle, anchorStyle)} href="/">
        <TextWithIcon icon={<ProfileIcon {...IconProps} />}>Profile</TextWithIcon>
      </a>
    </li>
  </menu>
)
