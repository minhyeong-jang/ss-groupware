export const breakpoint = [375, 414, 768, 960, 1280];
export const color = {
  gray5: "#fcfcfd",
  gray10: "#f0f1f4",
  gray10_50: "rgba(240, 241, 244, 0.5)",
  gray20: "#dadde0",
  gray30: "#c9cdd2",
  gray30_50: "rgba(201, 205, 210, 0.5)",
  gray40: "#b2b8be",
  gray40_50: "rgba(178, 184, 190, 0.5)",
  gray50: "#99a1a8",
  gray60: "#757d86",
  gray70: "#50585f",
  gray80: "#3a3e45",
  gray90: "#21242a",
  gray90_97: "rgba(33, 36, 42, 0.97)",
  gray100: "#131518",
  gray100_50: "rgba(19, 21, 24, 0.5)",
  point: "#4d00eb",
  white: "#ffffff",
  blue: "#1890ff",
};
export const mediaQuery = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  /**
   * Extra small
   * \>= 375px
   * @example 일반 모바일 기기, iPhone X
   */
  xs: `@media screen and (min-width: ${breakpoint[0]}px)`,
  /**
   * Small
   * \>= 414px
   * @example 큰 모바일 기기, iPhone 8 Plus, iPhone 11 XS Max
   */
  sm: `@media screen and (min-width: ${breakpoint[1]}px)`,
  /**
   * Medium
   * \>= 768px
   * @example 태블릿
   */
  md: `@media screen and (min-width: ${breakpoint[2]}px)`,
  /**
   * Large
   * \>= 960px
   * @example 데스크탑
   */
  lg: `@media screen and (min-width: ${breakpoint[3]}px)`,
  /**
   * Extra large
   * \>= 1280px
   * @example 고해상도 데스크탑
   */
  xl: `@media screen and (min-width: ${breakpoint[4]}px)`,
  /* eslint-enable */
};

export const graphic = {};

export const theme = {
  breakpoint,
  mediaQuery,
  color,
  graphic,
};

export type Theme = typeof theme;

export default theme;
