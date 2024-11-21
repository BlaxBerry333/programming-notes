import { type DefaultTheme } from "vitepress";

export const GIT_ROOT = "/notes/dev-tools/git";

export const GIT_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Git 基础",
    collapsed: false,
    items: [
      {
        text: "常用命令",
        link: `${GIT_ROOT}/__base__/commands/`,
      },
      {
        text: "Git SSH",
        link: `${GIT_ROOT}/__base__/ssh/`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${GIT_ROOT}/`,
  },
];
