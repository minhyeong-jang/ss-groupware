export const breakpoint = [375, 414, 768, 960, 1280];
export const color = {
  gray100: "#131518",
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
