import { DefaultTheme } from "vitepress/theme";

// web-frontend
// ------------------------------------------------------------------------------------------------------------------------
import { JS_ROOT, JS_SIDEBAR } from "./web-frontend/_javascript";

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

  /**
   * web-backend
   * ------------------------------------------------------------------------------------------------------------------------
   */
  [PYTHON_ROOT]: PYTHON_SIDEBAR,
  [DJANGO_ROOT]: DJANGO_SIDEBAR,
};
