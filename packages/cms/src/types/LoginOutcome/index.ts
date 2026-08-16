export type LoginOutcome =
  { type: "error"; message: string } | { type: "secondFactor" } | { type: "success" }
