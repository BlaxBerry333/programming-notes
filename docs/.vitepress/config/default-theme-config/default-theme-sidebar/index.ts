import { DefaultTheme } from "vitepress/theme";

// web-frontend
// ------------------------------------------------------------------------------------------------------------------------
import { JS_ROOT, JS_SIDEBAR } from "./web-frontend/_javascript";
import { TS_ROOT, TS_SIDEBAR } from "./web-frontend/_typescript";
import { REACT_JS_ROOT, REACT_JS_SIDEBAR } from "./web-frontend/_react";
import { VUE_JS_ROOT, VUE_JS_SIDEBAR } from "./web-frontend/_vue";
import { DART_ROOT, DART_SIDEBAR } from "./web-frontend/_dart";
import { FLUTTER_ROOT, FLUTTER_SIDEBAR } from "./web-frontend/_flutter";

// web-backend
// ------------------------------------------------------------------------------------------------------------------------
import { PYTHON_ROOT, PYTHON_SIDEBAR } from "./web-backend/_python";
import { DJANGO_ROOT, DJANGO_SIDEBAR } from "./web-backend/_django";
import { DRF_ROOT, DRF_SIDEBAR } from "./web-backend/_django-rest-framework";
import { GOLANG_ROOT, GOLANG_SIDEBAR } from "./web-backend/_golang";
import { RUST_ROOT, RUST_SIDEBAR } from "./web-backend/_rust";

// web-infrastructure
// ------------------------------------------------------------------------------------------------------------------------
import { SHELL_ROOT, SHELL_SIDEBAR } from "./web-infrastructure/_shell";
import {
  DOCKER_COMPOSE_ROOT,
  DOCKER_ROOT,
  DOCKER_SIDEBAR,
} from "./web-infrastructure/_docker";

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
  [DRF_ROOT]: DRF_SIDEBAR,
  [DJANGO_ROOT]: DJANGO_SIDEBAR,
  [GOLANG_ROOT]: GOLANG_SIDEBAR,
  [RUST_ROOT]: RUST_SIDEBAR,

  /**
   * web-infrastructure
   * ------------------------------------------------------------------------------------------------------------------------
   */
  [SHELL_ROOT]: SHELL_SIDEBAR,
  [DOCKER_ROOT]: DOCKER_SIDEBAR,
  [DOCKER_COMPOSE_ROOT]: DOCKER_SIDEBAR,

  /**
   * cross-platform
   * ------------------------------------------------------------------------------------------------------------------------
   */
  [DART_ROOT]: DART_SIDEBAR,
  [FLUTTER_ROOT]: FLUTTER_SIDEBAR,
};
