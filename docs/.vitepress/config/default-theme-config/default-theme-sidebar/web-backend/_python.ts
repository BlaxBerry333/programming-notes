import { type DefaultTheme } from "vitepress";

export const PYTHON_ROOT = "/notes/web-backend/languages/python";

export const PYTHON_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Python 基础",
    collapsed: false,
    items: [
      {
        text: "虚拟环境",
        link: `${PYTHON_ROOT}/__base__/virtual-env`,
      },
      {
        text: "变量与常量",
        link: `${PYTHON_ROOT}/__base__/variable-constant`,
      },
      {
        text: "引用与拷贝",
        link: `${PYTHON_ROOT}/__base__/data-reference-copy`,
      },
      {
        text: "数据类型操作",
        link: `${PYTHON_ROOT}/__base__/data-types/type-operations`,
      },
      {
        text: "数据类型",
        collapsed: true,
        items: [
          {
            text: "不可变类型",
            collapsed: true,
            items: [
              {
                text: "数值 ( int、float )",
                link: `${PYTHON_ROOT}/__base__/data-types/immutable/number`,
              },
              {
                text: "布尔值 ( bool )",
                link: `${PYTHON_ROOT}/__base__/data-types/immutable/bool`,
              },
              {
                text: "字符串 ( str )",
                link: `${PYTHON_ROOT}/__base__/data-types/immutable/str`,
              },
              {
                text: "元组 ( tuple )",
                link: `${PYTHON_ROOT}/__base__/data-types/immutable/tuple`,
              },
              {
                text: "空值 ( None )",
                link: `${PYTHON_ROOT}/__base__/data-types/immutable/none`,
              },
            ],
          },
          {
            text: "可变类型",
            collapsed: true,
            items: [
              {
                text: "列表 ( list )",
                link: `${PYTHON_ROOT}/__base__/data-types/mutable/list`,
              },
              {
                text: "字典 ( dict )",
                link: `${PYTHON_ROOT}/__base__/data-types/mutable/dict`,
              },
              {
                text: "集合 ( set )",
                link: `${PYTHON_ROOT}/__base__/data-types/mutable/set`,
              },
            ],
          },
        ],
      },
      {
        text: "运算符",
        link: `${PYTHON_ROOT}/__base__/operators`,
      },
      {
        text: "流程控制",
        link: `${PYTHON_ROOT}/__base__/control-flow`,
      },
      {
        text: "函数",
        link: `${PYTHON_ROOT}/__base__/function`,
      },
      {
        text: "异常处理",
        link: `${PYTHON_ROOT}/__base__/exception-handling`,
      },
      {
        text: "文件操作",
        link: `${PYTHON_ROOT}/__base__/file-operations`,
      },
      {
        text: "面向对象",
        collapsed: true,
        items: [
          {
            text: "类 ( Class )",
            link: `${PYTHON_ROOT}/__base__/oop/class`,
          },
        ],
      },
      {
        text: "并发与异步",
        collapsed: true,
        items: [
          {
            text: "多线程",
            link: `${PYTHON_ROOT}/__base__/concurrency-async/multithreading`,
          },
        ],
      },
      {
        text: "模块开发",
        collapsed: true,
        items: [
          {
            text: "模块、包",
            link: `${PYTHON_ROOT}/__base__/module-dev/module-pkg`,
          },
        ],
      },
      {
        text: "常用内置模块",
        collapsed: true,
        items: [
          {
            text: "math",
            link: `${PYTHON_ROOT}/__base__/module-dev/built-in-modules/math`,
          },
          {
            text: "json",
            link: `${PYTHON_ROOT}/__base__/module-dev/built-in-modules/json`,
          },
          {
            text: "re",
            link: `${PYTHON_ROOT}/__base__/module-dev/built-in-modules/re`,
          },
          {
            text: "threading",
            link: `${PYTHON_ROOT}/__base__/module-dev/built-in-modules/threading`,
          },
        ],
      },
    ],
  },

  {
    text: "包管理工具",
    collapsed: false,
    items: [
      {
        text: "pip",
        link: `${PYTHON_ROOT}/__pkgs-management__/pip/`,
      },
    ],
  },

  {
    text: "功能扩展",
    collapsed: false,
    items: [
      {
        text: "Requests",
        link: `${PYTHON_ROOT}/__extensions__/requests`,
      },
      {
        text: "Pandas",
        link: `${PYTHON_ROOT}/__extensions__/pandas`,
      },
      {
        text: "NumPy",
        link: `${PYTHON_ROOT}/__extensions__/numpy`,
      },

      {
        text: "Matplotlib",
        link: `${PYTHON_ROOT}/__extensions__/matplotlib`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${PYTHON_ROOT}/`,
  },
];
