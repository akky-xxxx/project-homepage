import { useState } from "hono/jsx"

const INITIAL_STATE = 0
const INCREASE_VALUE = 1

export const useCounter = () => {
  const [count, setCount] = useState(INITIAL_STATE)

  const handleIncrement = () => {
    setCount((currentState) => currentState + INCREASE_VALUE)
  }

  return { count, handleIncrement }
}
