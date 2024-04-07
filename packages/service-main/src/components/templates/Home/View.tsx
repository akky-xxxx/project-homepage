import { Switch } from "../../atoms/Switch"

import type { ComponentProps, FC } from "react"

type Props = ComponentProps<typeof Switch>

export const View: FC<Props> = (props) => {
  const { ...switchProps } = props
  return (
    <main>
      <div>Home</div>
      <Switch {...switchProps} />
    </main>
  )
}
