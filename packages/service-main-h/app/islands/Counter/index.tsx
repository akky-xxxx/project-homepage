import { View } from "./View"
import { useCounter } from "./modules/useCounter"

import type { FC } from "hono/jsx"

const Counter: FC = () => {
  const dependencies = useCounter()

  return <View {...dependencies} />
}

export default Counter
