import { type DefaultTheme } from "vitepress";

export const REACT_JS_ROOT = "/notes/web-frontend/frameworks/react";

export const REACT_JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "React 基础",
    collapsed: false,
    items: [
      {
        text: "组件基础",
        collapsed: true,
        items: [
          {
            text: "标签语法 ( JSX / TSX )",
            link: `${REACT_JS_ROOT}/__base__/components-jsx-tsx`,
          },
          {
            text: "组件间通信",
            link: `${REACT_JS_ROOT}/__base__/component-communication`,
          },
          {
            text: "组件样式",
            link: `${REACT_JS_ROOT}/__base__/component-styles`,
          },
          {
            text: "常用内置组件",
            link: `${REACT_JS_ROOT}/__base__/builtin-components`,
          },
        ],
      },
      {
        text: "钩子函数 ( Hooks )",
        link: `${REACT_JS_ROOT}/__base__/hooks`,
      },
      {
        text: "常用内置函数",
        link: `${REACT_JS_ROOT}/__base__/builtin-functions`,
      },
      // {
      //   text: "TypeScript",
      //   link: `${REACT_JS_ROOT}/__base__/typescript`,
      // },
    ],
  },

  {
    text: "React 高级",
    collapsed: false,
    items: [
      {
        text: "设计规范",
        link: `${REACT_JS_ROOT}/__advanced__/design-patterns`,
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
        text: "React Hook Form",
        link: `https://www.react-hook-form.com/`,
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
