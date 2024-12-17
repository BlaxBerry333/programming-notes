import { type DefaultTheme } from "vitepress";

export const FLUTTER_ROOT = "/notes/mobile-app/frameworks/flutter";

export const FLUTTER_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Flutter 基础",
    collapsed: false,
    items: [
      {
        text: "自定义组件",
        link: `${FLUTTER_ROOT}/__base__/custom-widget`,
      },
      {
        text: "常用内置组件",
        link: `${FLUTTER_ROOT}/__base__/builtin-widgets`,
      },
      {
        text: "状态管理",
        link: `${FLUTTER_ROOT}/__base__/`,
      },
      {
        text: "动画效果",
        link: `${FLUTTER_ROOT}/__base__/`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${FLUTTER_ROOT}/`,
  },
];
