import { MyTheme } from "../types/theme";

export const theme: MyTheme = {
  primaryColor: "#2684FF", // primary color for all components
  linkColor: "#5d6671", // link color
  successColor: "#52c41a", // success state color
  warningColor: "#faad14", // warning state color
  errorColor: "#f5222d", // error state color
  fontSizeBase: "14px", // major text font size
  headingColor: "rgba(0, 0, 0, 0.85)", // heading text color
  textColor: "rgba(0, 0, 0, 0.65)", // major text color
  textColorSecondary: "rgba(0, 0, 0, 0.45)", // secondary text color
  white: "#fff",
  black: "#000",
  // lightGray: "#EFEFEF",
  darkBlue: "#2C313E",
  // Colors used for label validation status
  // error: '#F60000"',
  warning: "#FF8000",
  // success: "#179F09",
  secondaryColor: "#5d6671", // secondary color for all components
  disabledColor: "#DADADA", // disable state color
  borderRadiusBase: "2px", // major border radius
  borderColorBase: "#2684ff", // major border color
  boxShadowBase:
    "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)", // major shadow for layers
  fontFamily: "Inter, sans-serif", // major font family
  /* Note: The value assigned to this property should be identical with `--default-font-family` variable in styles\reset\css-reset.css */
  letterSpacing: "-1px", // major font family
  grayBackground: "#EEF1F4", // disable state color
  darkGrayBackground: "#DEE2E9", // disable state color

  // Brand colors
  primary: "#2684FF",
  secondary: "#5d6671",
  divnotesGreen: "#199E0B",
  divnotesPurple: "#713FDC",

  // State colors
  disabled: "#FBFBFB",
  selected: "#D9EDFF",

  // Standard CSS color names
  // white: "#FFFFFF",
  // black: "#000000",
  inchworm: "#FFF2D8",
  paleCyan: "#DCFFE6",
  peachOrange: "#FFDFDC",
  pristine: "#F3F8FC",

  // Other named colors included in Figma design
  lightGray: "#B5B5B5",
  menu: "#EEF1F4",
  background: "#F3F8FC",
  add: "#4ECB71",
  alert: "#FFAB00",
  error: "#EA4335",
  sales: "#B787F6",
  success: "#4ECB71",
};
