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

// dev-tools
// ------------------------------------------------------------------------------------------------------------------------
import { DEV_TOOLS_ROOT, DEV_TOOLS_SIDEBAR } from "./dev-tools";

// mobile-app
// ------------------------------------------------------------------------------------------------------------------------
import { DART_ROOT, DART_SIDEBAR } from "./mobile-app/_dart";
import { FLUTTER_ROOT, FLUTTER_SIDEBAR } from "./mobile-app/_flutter";

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

  /**
   * dev-tools
   * ------------------------------------------------------------------------------------------------------------------------
   */
  [DEV_TOOLS_ROOT]: DEV_TOOLS_SIDEBAR,

  /**
   * mobile-app
   * ------------------------------------------------------------------------------------------------------------------------
   */
  [DART_ROOT]: DART_SIDEBAR,
  [FLUTTER_ROOT]: FLUTTER_SIDEBAR,
};
