(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 5604:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "createQueryClient": () => (/* binding */ createQueryClient),
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
;// CONCATENATED MODULE: ./src/styles/globalstyle.ts

/**
 * [Tailwind Preflight](https://tailwindcss.com/docs/preflight)를 fork하고 수정한 글로벌 스타일입니다.
 */

var GlobalStyle = /*#__PURE__*/(0,external_styled_components_.createGlobalStyle)(["/*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */ *,*::before,*::after{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}:root{-moz-tab-size:4;tab-size:4;}html,body{line-height:1.2;-webkit-text-size-adjust:100%;height:initial;background-image:linear-gradient(137deg,#0d5afd85 0%,#ff730000 40%),linear-gradient(225deg,#0dfd9c85 0%,#69a1ec00 40%),linear-gradient(45deg,#0be3c985 0%,#ff64ff00 40%),linear-gradient(270deg,#00d3fa,#0be3c9);}body{margin:0;}body{font-family:-apple-system,BlinkMacSystemFont,\uB9D1\uC740 \uACE0\uB515,Malgun Gothic,Apple SD \uC0B0\uB3CC\uACE0\uB515 Neo,Apple SD Gothic Neo,Segoe UI,Roboto,Helvetica,Arial,sans-serif;}hr{height:0;color:inherit;}abbr[title]{text-decoration:underline dotted;}b,strong{font-weight:bolder;}code,kbd,samp,pre{font-size:1em;font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace;}small{font-size:80%;}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline;}sub{bottom:-0.25em;}sup{top:-0.5em;}table{text-indent:0;border-color:inherit;}button,input,optgroup,select,textarea{margin:0;font-size:100%;font-family:inherit;line-height:1.2;}button,select{text-transform:none;}button,[type='button'],[type='reset'],[type='submit']{-webkit-appearance:button;}::-moz-focus-inner{padding:0;border-style:none;}:-moz-focusring{outline:1px dotted ButtonText;}:-moz-ui-invalid{box-shadow:none;}legend{padding:0;}progress{vertical-align:baseline;}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto;}[type='search']{outline-offset:-2px;-webkit-appearance:textfield;}::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-file-upload-button{font:inherit;-webkit-appearance:button;}summary{display:list-item;}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0;}button{background-color:transparent;background-image:none;}button:focus{outline:0;}fieldset{margin:0;padding:0;}ol,ul{margin:0;padding:0;list-style:none;}*,::before,::after{border-width:0;border-style:solid;}hr{border-top-width:1px;}textarea{resize:vertical;}button,[role='button']{cursor:pointer;}h1,h2,h3,h4,h5,h6{font-weight:inherit;font-size:inherit;}a{color:inherit;text-decoration:inherit;}button,input,optgroup,select,textarea{padding:0;color:inherit;line-height:inherit;}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle;}img,video{max-width:100%;height:auto;}html:lang(ko){word-break:keep-all;}.js-focus-visible &:focus:not(.focus-visible){outline:none;}input[type='text'],input[type='search'],input[type='url'],input[type='tel'],input[type='email'],input[type='password'],input[type='number'],input[type='date'],input[type='month'],input[type='week'],input[type='time'],input[type='datetime'],input[type='datetime-local'],textarea{outline:none;}button,input,optgroup,textarea,select{background-color:transparent;border:0px;}.ant-message .anticon{vertical-align:text-top;}.ant-modal{top:60px;}.ant-modal-body{padding:16px;}"]);
;// CONCATENATED MODULE: ./src/styles/theme.ts
var breakpoint = [375, 414, 768, 960, 1280];
var color = {
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
  blue: "#1890ff"
};
var mediaQuery = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */

  /**
   * Extra small
   * \>= 375px
   * @example 일반 모바일 기기, iPhone X
   */
  xs: "@media screen and (min-width: ".concat(breakpoint[0], "px)"),

  /**
   * Small
   * \>= 414px
   * @example 큰 모바일 기기, iPhone 8 Plus, iPhone 11 XS Max
   */
  sm: "@media screen and (min-width: ".concat(breakpoint[1], "px)"),

  /**
   * Medium
   * \>= 768px
   * @example 태블릿
   */
  md: "@media screen and (min-width: ".concat(breakpoint[2], "px)"),

  /**
   * Large
   * \>= 960px
   * @example 데스크탑
   */
  lg: "@media screen and (min-width: ".concat(breakpoint[3], "px)"),

  /**
   * Extra large
   * \>= 1280px
   * @example 고해상도 데스크탑
   */
  xl: "@media screen and (min-width: ".concat(breakpoint[4], "px)")
  /* eslint-enable */

};
var graphic = {};
var theme = {
  breakpoint: breakpoint,
  mediaQuery: mediaQuery,
  color: color,
  graphic: graphic
};
/* harmony default export */ const styles_theme = ((/* unused pure expression or super */ null && (theme)));
;// CONCATENATED MODULE: ./src/styles/index.ts


// EXTERNAL MODULE: ../../node_modules/antd/dist/antd.css
var antd = __webpack_require__(2978);
// EXTERNAL MODULE: external "react-query"
var external_react_query_ = __webpack_require__(1175);
// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2245);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);
;// CONCATENATED MODULE: external "moment/locale/ko"
const ko_namespaceObject = require("moment/locale/ko");
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./src/pages/_app.tsx










external_moment_default().locale("ko");
var createQueryClient = function createQueryClient() {
  return new external_react_query_.QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  });
};

var App = function App(_ref) {
  var Component = _ref.Component;
  var queryClientRef = (0,external_react_.useRef)(createQueryClient());
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_styled_components_.ThemeProvider, {
    theme: theme,
    children: [/*#__PURE__*/jsx_runtime_.jsx(GlobalStyle, {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Service closing"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "robots",
        content: "noindex,nofollow"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent"
      }), /*#__PURE__*/jsx_runtime_.jsx("script", {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-BQ3F25MPVG"
      }), /*#__PURE__*/jsx_runtime_.jsx("script", {
        dangerouslySetInnerHTML: {
          __html: "\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);}\n              gtag(\"js\", new Date());\n              gtag(\"config\", \"G-BQ3F25MPVG\");\n            "
        }
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(external_react_query_.QueryClientProvider, {
      client: queryClientRef.current,
      children: /*#__PURE__*/jsx_runtime_.jsx(Component, {})
    })]
  });
};

/* harmony default export */ const _app = (App);

/***/ }),

/***/ 2978:
/***/ (() => {



/***/ }),

/***/ 2245:
/***/ ((module) => {

"use strict";
module.exports = require("moment");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 1175:
/***/ ((module) => {

"use strict";
module.exports = require("react-query");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 7518:
/***/ ((module) => {

"use strict";
module.exports = require("styled-components");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5604));
module.exports = __webpack_exports__;

})();