import { useExteriorSwitch } from "@islands/ExteriorSwitch/modules/useExteriorSwitch"

import { View } from "./View"

import type { ExteriorMode } from "@shared/types/ExteriorMode"
import type { FC } from "hono/jsx"

type Props = {
  exteriorMode: ExteriorMode
}

const ExteriorSwitch: FC<Props> = (props) => {
  const dependencies = useExteriorSwitch(props)
  return <View {...dependencies} />
}

export default ExteriorSwitch
