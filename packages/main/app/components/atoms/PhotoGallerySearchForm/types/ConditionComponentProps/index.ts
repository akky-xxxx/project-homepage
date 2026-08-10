type Item = Partial<{
  checked: boolean
}> &
  Record<"display" | "value", string>

export type ConditionComponentProps = {
  name: string
  isMultiple?: boolean
  items: Item[]
}
