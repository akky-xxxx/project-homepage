import type { Skill } from "@shared/types/Skill"

export const Frameworks = [
  {
    level: 4,
    name: "React.js",
  },
  {
    level: 4,
    name: "Next.js (Pages router)",
  },
  {
    level: 2,
    name: "Next.js (App router)",
  },
  {
    level: 2,
    name: "Vue.js",
  },
  {
    level: 3,
    name: "Express",
  },
  {
    level: 2,
    name: "fastify",
  },
  {
    level: 3,
    name: "Redux",
  },
  {
    level: 3,
    name: "jotai",
  },
  {
    level: 3,
    name: "Recoil",
  },
  {
    level: 4,
    name: "styled components",
  },
  {
    level: 2,
    name: "Panda CSS",
  },
  {
    level: 1,
    name: "Hono",
  },
] as const satisfies Skill[]
