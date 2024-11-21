import { type DefaultTheme } from "vitepress";

import { JS_ROOT } from "../default-theme-sidebar/web-frontend/_javascript";
import { PYTHON_ROOT } from "../default-theme-sidebar/web-backend/_python";
import { DJANGO_ROOT } from "../default-theme-sidebar/web-backend/_django";
import { REACT_JS_ROOT } from "../default-theme-sidebar/web-frontend/_react";
import { VUE_JS_ROOT } from "../default-theme-sidebar/web-frontend/_vue";
import { GIT_ROOT } from "../default-theme-sidebar/dev-tools/_git";

export const DEFAULT_THEME_NAVBAR: Array<DefaultTheme.NavItem> = [
  {
    text: "常用技术",
    items: [
      {
        text: "语言",
        items: [
          { text: "JavaScript", link: `${JS_ROOT}/` },
          { text: "Python", link: `${PYTHON_ROOT}/` },
        ],
      },
      {
        text: "框架",
        items: [
          { text: "React.js", link: `${REACT_JS_ROOT}/` },
          { text: "Vue.js", link: `${VUE_JS_ROOT}/` },
          { text: "Django", link: `${DJANGO_ROOT}/` },
        ],
      },
    ],
  },
  {
    text: "常用工具",
    items: [
      { text: "Git", link: `${GIT_ROOT}/` },
      // { text: "Docker", link: `${DOCKER_ROOT}/` },
    ],
  },
];
