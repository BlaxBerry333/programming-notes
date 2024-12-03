import { type DefaultTheme } from "vitepress";

export const JS_ROOT = "/notes/web-frontend/languages/javascript";

export const JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "JavaScript 基础",
    collapsed: false,
    items: [
      {
        text: "数据类型",
        collapsed: true,
        items: [
          {
            text: "基本数据类型 ( 原始类型 )",
            collapsed: true,
            link: `${JS_ROOT}/__base__/data-types/primitive-types`,
          },
          {
            text: "引用数据类型 ( 对象类型 )",
            link: `${JS_ROOT}/__base__/data-types/reference-types`,
          },
          {
            text: "类型操作",
            link: `${JS_ROOT}/__base__/data-types/type-operations`,
          },
          {
            text: "存储与拷贝",
            link: `${JS_ROOT}/__base__/data-storage-copy`,
          },
        ],
      },
      {
        text: "变量与常量",
        link: `${JS_ROOT}/__base__/variable-constant`,
      },
      {
        text: "运算符",
        link: `${JS_ROOT}/__base__/operators`,
      },
      {
        text: "流程控制",
        link: `${JS_ROOT}/__base__/control-flow`,
      },
      {
        text: "函数",
        link: `${JS_ROOT}/__base__/function`,
      },
      {
        text: "异常处理",
        link: `${JS_ROOT}/__base__/exception-handling`,
      },
      {
        text: "模块开发",
        collapsed: true,
        items: [
          {
            text: "ES Module",
            link: `${JS_ROOT}/__base__/module-dev/es-module`,
          },
        ],
      },
      {
        text: "面向对象",
        collapsed: true,
        items: [
          {
            text: "类 ( Class )",
            link: `${JS_ROOT}/__base__/oop/class`,
          },
          {
            text: "原型 ( Prototype )",
            link: `${JS_ROOT}/__base__/oop/prototype`,
          },
        ],
      },
      {
        text: "并发与异步",
        collapsed: true,
        items: [
          {
            text: "Promise",
            link: `${JS_ROOT}/__base__/concurrency-async/promise`,
          },
          {
            text: "Async/Await",
            link: `${JS_ROOT}/__base__/concurrency-async/async-await`,
          },
        ],
      },
    ],
  },

  // {
  //   text: "Web API",
  //   collapsed: false,
  //   items: [
  //     {
  //       text: "浏览器存储",
  //       link: `${JS_ROOT}/web-apis/browser-storage`,
  //     },
  //     {
  //       text: "网络请求",
  //       link: `${JS_ROOT}/web-apis/networking`,
  //     },
  //     {
  //       text: "DOM",
  //       link: `${JS_ROOT}/web-apis/dom`,
  //     },
  //     {
  //       text: "图像预览",
  //       link: `${JS_ROOT}/web-apis/image-preview`,
  //     },
  //   ],
  // },

  {
    text: "功能扩展",
    collapsed: false,
    items: [
      {
        text: "Lodash",
        link: `${JS_ROOT}/__extensions__/lodash`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${JS_ROOT}/`,
  },
];
