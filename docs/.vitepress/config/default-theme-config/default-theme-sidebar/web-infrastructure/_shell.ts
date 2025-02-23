import { type DefaultTheme } from "vitepress";

export const SHELL_ROOT = `/notes/web-infrastructure/operating-system/shell`;

export const SHELL_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Shell 基础",
    collapsed: false,
    items: [
      {
        text: "变量",
        link: `${SHELL_ROOT}/__base__/variable`,
      },
      // {
      //   text: "函数",
      //   link: `${SHELL_ROOT}/__base__/function`,
      // },
      {
        text: "运算符",
        link: `${SHELL_ROOT}/__base__/operators`,
      },
      {
        text: "流程控制",
        link: `${SHELL_ROOT}/__base__/control-flow`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${SHELL_ROOT}/`,
  },
];
