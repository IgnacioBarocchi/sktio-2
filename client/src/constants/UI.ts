const dimensions = new Map<string, number>();
//pixels
dimensions.set("desktop-aside", 300);
//vh
dimensions.set("nav-height", 4);
dimensions.set("scrollbar-width", 20);
dimensions.set("extra-padding", 8);

const asideWidth = (isSmallDevice: boolean) => {
  const result = isSmallDevice
    ? "100vw"
    : dimensions.get("desktop-aside") + "px";
  return result;
};

const imageFilePreviewLeftPosition = (isSmallDevice: boolean): string => {
  if (isSmallDevice) return "90vw";

  const scrollbarWidth = dimensions.get("scrollbar-width");
  // @ts-ignore
  const extraPadding = dimensions.get("extra-padding") * 6;
  const normalAsideWidth = parseInt(asideWidth(false));
  console.log(window.innerWidth);
  const result =
    // @ts-ignore
    normalAsideWidth * 2 + scrollbarWidth + extraPadding - window.innerWidth;

  return `${result}px`;
};

type FontSizes = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type Theme = {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  color: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    lowContrast: string;
    highlight: string;
    error: string;
    success: string;
    warning: string;
  };
  userColors: string[];
  fontSizes: FontSizes;
};

const fontSizes = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "24px",
  xxl: "40px",
};

// background: {
//   primary: "#1C1C1C",
//   secondary: "#2C2C2C",
//   tertiary: "#303030",
// },
const DarkTheme: Theme = {
  background: {
    primary: "#121415",
    secondary: "#181a1c",
    tertiary: "#27292e",
  },

  color: {
    primary: "#DADADA",
    secondary: "#B5B5B5",
    tertiary: "#A0A0A0",
    accent: "#545454",
    lowContrast: "#333333",
    highlight: "#8E44AD",
    error: "#E74C3C",
    success: "#27AE60",
    warning: "#F39C12",
  },
  userColors: [
    "#FF6363",
    "#FF9F43",
    "#FFCD43",
    "#FFDC43",
    "#FFE243",
    "#C7FF43",
    "#76FF43",
    "#43FF6B",
    "#43FFD8",
    "#43C9FF",
    "#4376FF",
    "#6B43FF",
    "#D843FF",
    "#FF43DC",
    "#FF439F",
    "#FF4363",
  ],
  fontSizes,
};

const LightTheme: Theme = {
  background: {
    primary: "#CCCCCC",
    secondary: "#B2B2B2",
    tertiary: "#999999",
  },
  color: {
    primary: "#333333",
    secondary: "#707070",
    tertiary: "#999999",
    accent: "#444444",
    lowContrast: "#d5d5d5",
    highlight: "#9B59B6",
    error: "#E74C3C",
    success: "#27AE60",
    warning: "#F39C12",
  },
  userColors: [
    "#990000",
    "#994C00",
    "#998000",
    "#999000",
    "#999900",
    "#5B9900",
    "#007300",
    "#006B4D",
    "#004D99",
    "#003366",
    "#000073",
    "#4D006B",
    "#99004D",
    "#990080",
    "#99004C",
    "#990000",
  ],
  fontSizes,
};

const themes: { light: Theme; dark: Theme } = {
  light: LightTheme,
  dark: DarkTheme,
};

export const UI = {
  themes,
  dimensions: {
    map: dimensions,
    getter: {
      asideWidth,
    },
  },
  positions: {
    getter: {
      imageFilePreviewLeftPosition,
    },
  },
  colors: {},
};

export default UI;
