import { css, cx } from "@panda/css"

import type { FC } from "hono/jsx"

export const Hamburger: FC = () => (
  <div className={rootStyle}>
    <div className={cx(barStyle, withoutCenterBarStyle, firstBarStyle)} />
    <div className={cx(barStyle, withoutCenterBarStyle, secondBarStyle)} />
    <div className={cx(barStyle, thirdBarStyle)} />
    <div className={cx(barStyle, withoutCenterBarStyle, fourthBarStyle)} />
    <div className={cx(barStyle, withoutCenterBarStyle, fifthBarStyle)} />
  </div>
)

const rootStyle = css({
  height: "25px",
  position: "relative",
  width: "25px",
})

const barStyle = css({
  backgroundColor: "var(--primary-color)",
  height: "4px",
  position: "absolute",
  transition: "transform {animations.02}",
})

const withoutCenterBarStyle = css({
  borderRadius: "9999px",
  width: "75%",
})

const firstBarStyle = css({
  left: 0,
  top: "1px",
  transformOrigin: "top left",

  ":checked + div &": {
    transform: "rotate(45deg) translateY(-3px)",
  },
})

const secondBarStyle = css({
  right: 0,
  top: "1px",
  transformOrigin: "top right",

  ":checked + div &": {
    transform: "rotate(-45deg) translateY(-3px)",
  },
})

const thirdBarStyle = css({
  borderRadius: "9999px",
  bottom: 0,
  left: 0,
  marginBlock: "auto",
  right: 0,
  top: 0,

  ":checked + div &": {
    transform: "scaleX(0)",
  },
})

const fourthBarStyle = css({
  bottom: "1px",
  left: 0,
  transformOrigin: "bottom left",

  ":checked + div &": {
    transform: "rotate(-45deg) translateY(3px)",
  },
})

const fifthBarStyle = css({
  bottom: "1px",
  right: 0,
  transformOrigin: "bottom right",

  ":checked + div &": {
    transform: "rotate(45deg) translateY(3px)",
  },
})
