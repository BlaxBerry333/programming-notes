import { type DefaultTheme } from "vitepress";

// 语言
// ------------------------------------------------------------------------------------------------------------------------
import { JS_ROOT } from "../default-theme-sidebar/web-frontend/_javascript";
import { PYTHON_ROOT } from "../default-theme-sidebar/web-backend/_python";

// 框架
// ------------------------------------------------------------------------------------------------------------------------
import { REACT_JS_ROOT } from "../default-theme-sidebar/web-frontend/_react";
import { DJANGO_ROOT } from "../default-theme-sidebar/web-backend/_django";
import { FLUTTER_ROOT } from "../default-theme-sidebar/web-frontend/_flutter";

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
          { text: "Django", link: `${DJANGO_ROOT}/` },
          { text: "Flutter", link: `${FLUTTER_ROOT}/` },
        ],
      },
    ],
  },
  {
    text: "常用工具",
    items: [
      {
        text: "开发环境",
        items: [
          { text: "asdf", link: "/notes/dev-tools/version/asdf" },
          { text: "Git", link: "/notes/dev-tools/version/git" },
          { text: "Vim", link: "/notes/dev-tools/editor/vim" },
        ],
      },
      {
        text: "构建部署",
        items: [
          { text: "Makefile", link: "/notes/dev-tools/auto-build/makefile" }, 
        ],
      },
      {
        text: "其他",
        items: [{ text: "cURL", link: "/notes/dev-tools/debugging/curl" }],
      },
    ],
  },
];
