import { type DefaultTheme } from "vitepress";

export const REACT_JS_ROOT = "/notes/web-frontend/frameworks/react";

export const REACT_JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "React 基础",
    collapsed: false,
    items: [
      {
        text: "JSX / TSX",
        link: `${REACT_JS_ROOT}/__base__/jsx-tsx`,
      },
      {
        text: "组件基础",
        link: `${REACT_JS_ROOT}/__base__/component`,
      },
      {
        text: "内置组件",
        link: `${REACT_JS_ROOT}/__base__/builtin-components`,
      },
      {
        text: "内置函数",
        link: `${REACT_JS_ROOT}/__base__/builtin-functions`,
      },
      {
        text: "内置 Hooks",
        link: `${REACT_JS_ROOT}/__base__/builtin-hooks`,
      },
    ],
  },

  {
    text: "功能扩展",
    collapsed: false,
    items: [
      {
        text: "React Router",
        link: `https://reactrouter.com/`,
      },
      {
        text: "Redux Toolkit",
        link: `https://redux-toolkit.js.org/`,
      },
      {
        text: "TanStack Query",
        link: `https://tanstack.com/query/latest/docs/framework/react/overview`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${REACT_JS_ROOT}/`,
  },
];
