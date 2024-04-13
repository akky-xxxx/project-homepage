import { css } from "hono/css"

export const globalStyle = css`
  :-hono-global {
    html {
      font-size: 62.5%;
    }

    body {
      background-color: var(--primary-background);
      color: var(--primary-color);
      font-size: 1.6rem;
      transition-duration: 0.2s;
      transition-property: background-color, color;
      transition-timing-function: ease;
    }

    ul {
      margin-block: 0;
      padding-inline: 0;
    }

    li {
      list-style: none;
    }

    menu {
      margin-block: 0;
      padding-left: 0;
    }
  }
`
