import { type DefaultTheme } from "vitepress";

export const VUE_JS_ROOT = "/notes/web-frontend/libs-frameworks/vue";

export const VUE_JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Vue 基础",
    collapsed: false,
    items: [
      {
        text: "数据定义",
        link: `${VUE_JS_ROOT}/__base__/data-definition`,
      },
      {
        text: "数据渲染",
        link: `${VUE_JS_ROOT}/__base__/data-rendering`,
      },
      {
        text: "数据监听",
        link: `${VUE_JS_ROOT}/__base__/data-watching`,
      },
      {
        text: "事件处理",
        link: `${VUE_JS_ROOT}/__base__/event-handling`,
      },
      {
        text: "组件基础",
        link: `${VUE_JS_ROOT}/__base__/component`,
      },
      {
        text: "内置组件",
        link: `${VUE_JS_ROOT}/__base__/builtin-components`,
      },
      {
        text: "生命周期 Hooks",
        link: `${VUE_JS_ROOT}/__base__/lifecycle-hooks`,
      },
    ],
  },

  {
    text: "Vue 性能优化",
    collapsed: false,
    items: [],
  },

  {
    text: "功能扩展",
    collapsed: false,
    items: [
      {
        text: "Vue Router",
        link: `${VUE_JS_ROOT}/__extensions__/vue-router`,
      },
      {
        text: "Pinia",
        link: `${VUE_JS_ROOT}/__extensions__/pinia`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${VUE_JS_ROOT}/`,
  },
];
