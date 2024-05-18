import { css } from "hono/css"

import { ShowClasses } from "@shared/const/ShowClasses"
import { MediaQueries } from "@shared/styles/MediaQueries"

const { MEDIA_ONLY_HOVER, MEDIA_PC, MEDIA_SP } = MediaQueries

export const globalStyle = css`
  :-hono-global {
    html {
      font-size: 62.5%;
    }

    body {
      background-color: var(--primary-background);
      color: var(--primary-color);
      font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo,
        sans-serif;
      font-size: 1.6rem;
      overflow-y: hidden;
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

    a {
      color: var(--primary-color);
      text-decoration: underline;
      transition: opacity 0.2s ease;

      &:visited {
        color: -webkit-link;
      }

      ${MEDIA_ONLY_HOVER} {
        &:hover {
          opacity: 0.5;
        }
      }
    }

    body {
      .${ShowClasses.PC} {
        ${MEDIA_SP} {
          display: none;
        }
      }

      .${ShowClasses.SP} {
        ${MEDIA_PC} {
          display: none;
        }
      }
    }
  }
`
