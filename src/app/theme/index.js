const theme = {
  spacing: 5,
  palette: {
    brandEmail: {
      primary: "#041249",
      secondary: "#FFFFFF",
    },
    common: {
      border: "#D2D2D2",
      borderLight: "#F3F3F3",
      borderEmail: "#D9D9D9",
    },
    primary: {
      main: "#2244CE",
      contrastText: "#FFFFFF",
    },
    treat: {
      brand: "#FFC062",
      text: "#FFFFFF",
    },
    background: {
      paper: "#FFFFFF",
      white: "#FFFFFF",
      default: "#FFFFFF",
      blue: "#041249",
      yellow: "#FFC062",
      cyan: "#74C9D4",
      light: "#FAFAFA",
      backdrop: "#080D25",
      gray: "#F3F3F3",
    },
    text: {
      primary: "#080D25",
      default: "#080D25", // alt name for primary
      secondary: "#080D25",
      subdued: "#757575",
      disabled: "#C5C5C5",
      inactive: "#C5C5C5", // alt name for disabled
      highlight: "#9BD5DD",
      white: "#FFFFFF",
    },
    interactive: {
      focus: "#2244CE",
      hover: "#082494",
      pressed: "#001E61",
      disabled: "#D2D2D2",
      inverse: "#F3F3F3",
      subdued: "#EDF5FF",
      white: "#FFFFFF",
      darkblue: "#080D25",
    },
    success: {
      main: "#00A44B",
    },
    error: {
      main: "#D72C0D",
    },
    action: {
      disabledBackground: "#D2D2D2",
    },
  },
  transitions: {
    easing: {
      bounce: "cubic-bezier(.15,.7,.95,1.1)",
    },
  },
  dropShadows: {
    topNav: "0px 3px 4px rgba(0, 0, 0, 0.05)",
  },
  borderRadius: {
    default: "4px",
    rounded: "8px",
  },
};

export default theme;
