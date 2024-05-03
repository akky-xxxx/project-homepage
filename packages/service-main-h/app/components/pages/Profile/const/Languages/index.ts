import type { Skill } from "@shared/types/Skill"

export const Languages = [
  {
    level: 4,
    name: "HTML",
  },
  {
    level: 4,
    name: "CSS",
  },
  {
    level: 4,
    name: "JavaScript",
  },
  {
    level: 4,
    name: "TypeScript",
  },
  {
    level: 3,
    name: "Node.js",
  },
  {
    level: 1,
    name: "Bun",
  },
] as const satisfies Skill[]
