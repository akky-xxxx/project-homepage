import type { FC } from "hono/jsx"

type Props = {
  count: number
  handleIncrement: () => void
}

export const View: FC<Props> = (props) => {
  const { count, handleIncrement } = props

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={handleIncrement}>
        Increment
      </button>
    </div>
  )
}
