import { type DefaultTheme } from "vitepress";

export const VUE_JS_ROOT = "/notes/web-frontend/frameworks/vue";

export const VUE_JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Vue 基础",
    collapsed: false,
    items: [],
  },

  {
    text: "功能扩展",
    collapsed: false,
    items: [
      {
        text: "Vue Router",
        link: `https://router.vuejs.org/zh/`,
      },
      {
        text: "Pinia",
        link: `https://pinia.vuejs.org/zh/`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${VUE_JS_ROOT}/`,
  },
];
