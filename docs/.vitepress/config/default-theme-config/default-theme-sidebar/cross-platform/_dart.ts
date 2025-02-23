import { type DefaultTheme } from "vitepress";

export const DART_ROOT = "/notes/cross-platform/languages/dart";

export const DART_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Dart 基础",
    collapsed: false,
    items: [
      {
        text: "数据类型",
        collapsed: true,
        items: [
          {
            text: "基本数据类型",
            link: `${DART_ROOT}/__base__/data-types/primitive-types`,
          },
          {
            text: "引用数据类型",
            link: `${DART_ROOT}/__base__/data-types/reference-types`,
          },
          {
            text: "类型操作",
            link: `${DART_ROOT}/__base__/data-types/type-operations`,
          },
        ],
      },
      {
        text: "变量",
        link: `${DART_ROOT}/__base__/variable`,
      },
      {
        text: "函数",
        link: `${DART_ROOT}/__base__/function`,
      },
      {
        text: "运算符",
        link: `${DART_ROOT}/__base__/operators`,
      },
      {
        text: "流程控制",
        link: `${DART_ROOT}/__base__/control-flow`,
      },
      {
        text: "模块开发",
        collapsed: true,
        items: [
          {
            text: "库与包",
            link: `${DART_ROOT}/__base__/modules-dev/library-package`,
          },
          {
            text: "常用内置库",
            collapsed: true,
            link: `${DART_ROOT}/__base__/modules-dev/builtin-libraries`,
          },
          {
            text: "第三方包管理",
            link: `${DART_ROOT}/__base__/modules-dev/third-party-packages-managers`,
          },
        ],
      },
      {
        text: "面向对象",
        collapsed: true,
        items: [
          {
            text: "类",
            link: `${DART_ROOT}/__base__/oop/class`,
          },
        ],
      },
      {
        text: "异步",
        link: `${DART_ROOT}/__base__/async/`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${DART_ROOT}/`,
  },
];
