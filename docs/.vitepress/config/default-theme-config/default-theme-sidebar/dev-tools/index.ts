import { type DefaultTheme } from "vitepress";

export const DEV_TOOLS_ROOT = "/notes/dev-tools";
export const DEV_TOOLS_ROOT__GIT = `${DEV_TOOLS_ROOT}/version/git`;
export const DEV_TOOLS_ROOT__ASDF = `${DEV_TOOLS_ROOT}/version/asdf`;
export const DEV_TOOLS_ROOT__MAKEFILE = `${DEV_TOOLS_ROOT}/auto-build/makefile`;
export const DEV_TOOLS_ROOT__CURL = `${DEV_TOOLS_ROOT}/debugging/curl`;

export const DEV_TOOLS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "版本控制",
    collapsed: false,
    items: [
      {
        text: "Git",
        link: `${DEV_TOOLS_ROOT__GIT}/`,
      },
      {
        text: "asdf",
        link: `${DEV_TOOLS_ROOT__ASDF}/`,
      },
    ],
  },

  {
    text: "自动构建",
    collapsed: false,
    items: [
      {
        text: "Makefile",
        link: `${DEV_TOOLS_ROOT__MAKEFILE}/`,
      },
    ],
  },

  {
    text: "调试分析",
    collapsed: false,
    items: [
      {
        text: "cRUL",
        link: `${DEV_TOOLS_ROOT__CURL}/`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${DEV_TOOLS_ROOT}/`,
  },
];
