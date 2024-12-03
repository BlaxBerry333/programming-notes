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
        ],
      },

      {
        text: "数据存储与拷贝",
        collapsed: true,
        items: [
          {
            text: "内存管理",
            link: `${JS_ROOT}/__base__/data-storage-copy/memory-management`,
          },
          {
            text: "拷贝与修改",
            link: `${JS_ROOT}/__base__/data-storage-copy/copy-change`,
          },
        ],
      },
      {
        text: "变量",
        link: `${JS_ROOT}/__base__/variable`,
      },
      {
        text: "函数",
        link: `${JS_ROOT}/__base__/function`,
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
            text: "类",
            link: `${JS_ROOT}/__base__/oop/oop-class`,
          },
          {
            text: "构造函数与原型链",
            link: `${JS_ROOT}/__base__/oop/oop-constructor-function-prototype-chain`,
          },
          {
            text: "this 指向",
            link: `${JS_ROOT}/__base__/oop/this-pointing`,
          },
        ],
      },
      {
        text: "进程与线程",
        collapsed: true,
        link: `${JS_ROOT}/__base__/process-thread`,
      },
      {
        text: "异步与并发",
        collapsed: true,
        items: [
          {
            text: "Promise",
            link: `${JS_ROOT}/__base__/async-concurrency/promise`,
          },
          {
            text: "Generator",
            link: `${JS_ROOT}/__base__/async-concurrency/generator`,
          },
          {
            text: "Async / Await",
            link: `${JS_ROOT}/__base__/async-concurrency/async-await`,
          },
        ],
      },

      {
        text: "常用 Web API",
        collapsed: true,
        items: [
          {
            text: "BOM",
            link: `${JS_ROOT}/__base__/web-apis/BOM`,
          },
          {
            text: "DOM",
            link: `${JS_ROOT}/__base__/web-apis/DOM`,
          },
          {
            text: "Workers",
            link: `${JS_ROOT}/__base__/web-apis/workers`,
          },
          {
            text: "Browser Storage",
            link: `${JS_ROOT}/__base__/web-apis/browser-storage`,
          },
          // {
          //   text: "网络请求",
          //   link: `${JS_ROOT}/__base__/web-apis/networking`,
          // },
          // {
          //   text: "图像预览",
          //   link: `${JS_ROOT}/web-apis/image-preview`,
          // },
        ],
      },
    ],
  },

  {
    text: "JavaScript 高级",
    collapsed: false,
    items: [
      {
        text: "常见设计模式",
        link: `${JS_ROOT}/__advanced__/design-patterns/`,
      },
      {
        text: "常见算法",
        link: `${JS_ROOT}/__advanced__/algorithms`,
      },
    ],
  },

  {
    text: "功能扩展",
    collapsed: false,
    items: [
      {
        text: "Lodash",
        link: `https://lodash.com/docs/`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${JS_ROOT}/`,
  },
];
