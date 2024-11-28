import { DefaultTheme } from "vitepress/theme";

// web-frontend
// ------------------------------------------------------------------------------------------------------------------------
import { JS_ROOT, JS_SIDEBAR } from "./web-frontend/_javascript";
import { TS_ROOT, TS_SIDEBAR } from "./web-frontend/_typescript";
import { REACT_JS_ROOT, REACT_JS_SIDEBAR } from "./web-frontend/_react";
import { VUE_JS_ROOT, VUE_JS_SIDEBAR } from "./web-frontend/_vue";

// web-backend
// ------------------------------------------------------------------------------------------------------------------------
import { PYTHON_ROOT, PYTHON_SIDEBAR } from "./web-backend/_python";
import { DJANGO_ROOT, DJANGO_SIDEBAR } from "./web-backend/_django";

export const DEFAULT_THEME_SIDEBAR: DefaultTheme.Sidebar = {
  /**
   * web-frontend
   * ------------------------------------------------------------------------------------------------------------------------
   */
  [JS_ROOT]: JS_SIDEBAR,
  [TS_ROOT]: TS_SIDEBAR,
  [REACT_JS_ROOT]: REACT_JS_SIDEBAR,
  [VUE_JS_ROOT]: VUE_JS_SIDEBAR,

  /**
   * web-backend
   * ------------------------------------------------------------------------------------------------------------------------
   */
  [PYTHON_ROOT]: PYTHON_SIDEBAR,
  [DJANGO_ROOT]: DJANGO_SIDEBAR,
};
