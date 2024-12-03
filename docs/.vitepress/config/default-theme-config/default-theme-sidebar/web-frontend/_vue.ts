import { type DefaultTheme } from "vitepress";

export const VUE_JS_ROOT = "/notes/web-frontend/frameworks/vue";

export const VUE_JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Vue 基础",
    collapsed: false,
    items: [
      {
        text: "组件基础",
        collapsed: true,
        items: [
          {
            text: "模版语法",
            link: `${VUE_JS_ROOT}/__base__/component-template-syntax`,
          },
          {
            text: "响应式数据",
            link: `${VUE_JS_ROOT}/__base__/component-reactive-data`,
          },
          {
            text: "组件间通信",
            link: `${VUE_JS_ROOT}/__base__/component-communication`,
          },
          {
            text: "组件样式",
            link: `${VUE_JS_ROOT}/__base__/component-styles`,
          },
          {
            text: "常用内置组件",
            link: `${VUE_JS_ROOT}/__base__/builtin-components`,
          },
        ],
      },
      {
        text: "钩子函数 ( Hooks )",
        link: `${VUE_JS_ROOT}/__base__/hooks`,
      },
      {
        text: "常用内置函数",
        link: `${VUE_JS_ROOT}/__base__/builtin-functions`,
      },
      // {
      //   text: "TypeScript",
      //   link: `${REACT_JS_ROOT}/__base__/typescript`,
      // },
    ],
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
