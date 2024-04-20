// eslint-disable-next-line import/no-extraneous-dependencies
import { defineGlobalStyles } from "@pandacss/dev"

export const GlobalCss = defineGlobalStyles({
  html: {
    fontSize: "62.5%",

    _osLight: {
      colorScheme: "light",
    },

    _osDark: {
      colorScheme: "dark",
    },
  },

  body: {
    backgroundColor: "var(--primary-background)",
    color: "var(--primary-color)",
    fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
    fontSize: "1.6rem",
    overflowY: "hidden",
    transitionDuration: "0.2s",
    transitionProperty: "background-color, color",
    transitionTimingFunction: "ease",
  },

  ul: {
    marginBlock: 0,
    paddingInline: 0,
  },

  li: {
    listStyle: "none",
  },

  menu: {
    marginBlock: 0,
    paddingLeft: 0,
  },

  a: {
    color: "var(--primary-color)",
    textDecoration: "none",
    transition: "opacity {animations.02}",

    "&:visited": {
      color: "-webkit-link",

      _support: {
        opacity: "0.5",
      },
    },
  },
})
