import type { Skill } from "@shared/types/Skill"

export const AI = [
  {
    level: 2,
    name: "chatGPT",
  },
  {
    level: 2,
    name: "Codex",
  },
  {
    level: 2,
    name: "Claude",
  },
  {
    level: 2,
    name: "Claude Code",
  },
  {
    level: 2,
    name: "Github Copilot",
  },
  {
    level: 1,
    name: "Devin",
  },
] as const satisfies Skill[]
