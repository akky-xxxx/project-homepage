import type { Skill } from "@shared/types/Skill"

export const Infrastructures = [
  {
    level: 2,
    name: "Could Run",
  },
  {
    level: 2,
    name: "Could Storage",
  },
  {
    level: 1,
    name: "Cloudflare Pages",
  },
] as const satisfies Skill[]
