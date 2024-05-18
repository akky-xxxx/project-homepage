type Item = Record<"display" | "value", string>

export type ConditionComponentProps = {
  name: string
  isMultiple?: boolean
  items: Item[]
}
