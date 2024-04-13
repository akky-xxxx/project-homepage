import { css } from "hono/css"

export const summaryStyle = css`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  &::-webkit-details-marker {
    display: none;
  }

  & + ul {
    padding-left: 1.8rem;
  }
`
