import { css } from "@panda/css"

export const switchStyle = css(
  {
    cursor: "pointer",
    height: 55,
    position: "relative",
    width: 100,

    _peerDisabled: {
      cursor: "not-allowed",
    },
  },
  {
    _before: {
      backgroundColor: "backgroundColor",
      border: "3px solid #66f",
      borderRadius: "50%",
      content: '""',
      display: "block",
      height: 45,
      left: 5,
      position: "absolute",
      top: 5,
      transition: "left 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
      width: 45,
      zIndex: 20,
    },

    _peerChecked: {
      _before: {
        backgroundColor: "#99f",
        borderColor: "transparent",
        left: 50,
      },
    },

    _peerDisabled: {
      _before: {
        backgroundColor: "#999",
      },
    },
  },
  {
    _after: {
      backgroundColor: "transparent",
      border: "3px solid #66f",
      borderRadius: 9999,
      bottom: 0,
      content: '""',
      display: "block",
      height: 30,
      left: 0,
      margin: "auto",
      position: "absolute",
      right: 0,
      top: 0,
      transition: "background-color 0.3s ease, border-color 0.3s ease",
      width: 70,
    },

    _peerChecked: {
      _after: {
        backgroundColor: "#00f",
        borderColor: "transparent",
      },
    },

    _peerDisabled: {
      _after: {
        backgroundColor: "#333",
      },
    },
  },
)
