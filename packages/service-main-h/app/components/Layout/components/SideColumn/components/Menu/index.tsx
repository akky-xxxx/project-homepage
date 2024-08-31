import { cx } from "hono/css"

import { TextWithIcon } from "@atoms/TextWithIcon"
import { AboutIcon } from "@icons/AboutIcon"
import { ProfileIcon } from "@icons/ProfileIcon"
import { getHref } from "@shared/utils/getHref"

import { anchorStyle } from "./components/Items/styles/anchorStyle"
import { PhotoGalleryMenu } from "./components/PhotoGalleryMenu"
import { itemStyle } from "./components/styles/itemStyle"
import { menuStyle } from "./styles/menuStyle"

import type { PhotoGallerySearchQueries } from "app/shared/types/PhotoGallerySearchQueries"
import type { FC } from "hono/jsx"

const IconProps = {
  height: 20,
  width: 20,
} as const

type Props = PhotoGallerySearchQueries

export const Menu: FC<Props> = (props) => (
  <menu class={menuStyle} type="toolbar">
    <li>
      <PhotoGalleryMenu {...props} />
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
