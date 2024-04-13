import { SvgSize } from "@shared/const/SvgSize"

import type { FC } from "hono/jsx"

type Props = Partial<Record<"height" | "width", number>>

export const LocationIcon: FC<Props> = (props) => {
  const { height = SvgSize, width = SvgSize } = props

  return (
    <svg height={height} viewBox="0 0 384 512" width={width}>
      <path d="M192 0C85.97 0 0 85.97 0 192c0 77.41 26.97 99.03 172.3 309.7c9.531 13.77 29.91 13.77 39.44 0C357 291 384 269.4 384 192C384 85.97 298 0 192 0zM192 271.1c-44.13 0-80-35.88-80-80S147.9 111.1 192 111.1s80 35.88 80 80S236.1 271.1 192 271.1z" />
    </svg>
  )
}
