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
        text: "项目构建、包管理",
        collapsed: true,
        items: [
          {
            text: "pip",
            link: `${PYTHON_ROOT}/__base__/pkgs-management/pip`,
          },
        ],
      },
      {
        text: "数据类型",
        collapsed: true,
        items: [
          {
            text: "不可变类型",
            link: `${PYTHON_ROOT}/__base__/data-types/immutable-types`,
          },
          {
            text: "可变类型",
            link: `${PYTHON_ROOT}/__base__/data-types/mutable-types`,
          },
          {
            text: "数据类型操作",
            link: `${PYTHON_ROOT}/__base__/data-types/__type-operations`,
          },
        ],
      },
      {
        text: "数据存储与拷贝",
        collapsed: true,
        items: [
          {
            text: "内存管理",
            link: `${PYTHON_ROOT}/__base__/data-storage-copy/memory-management`,
          },
          {
            text: "拷贝与修改",
            link: `${PYTHON_ROOT}/__base__/data-storage-copy/copy-change`,
          },
        ],
      },
      {
        text: "变量",
        link: `${PYTHON_ROOT}/__base__/variable`,
      },
      {
        text: "函数",
        link: `${PYTHON_ROOT}/__base__/function`,
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
        text: "模块开发",
        collapsed: true,
        items: [
          {
            text: "模块与包",
            link: `${PYTHON_ROOT}/__base__/modules-dev/module-package`,
          },
          {
            text: "常用内置模块",
            collapsed: true,
            link: `${PYTHON_ROOT}/__base__/modules-dev/builtin-modules`,
          },
        ],
      },
      {
        text: "面向对象",
        collapsed: true,
        items: [
          {
            text: "类",
            link: `${PYTHON_ROOT}/__base__/oop/class`,
          },
          // {
          //   text: "设计模式",
          //   link: `${PYTHON_ROOT}/__base__/oop/design-patterns`,
          // },
        ],
      },
      {
        text: "进程与线程",
        collapsed: true,
        items: [],
      },
      {
        text: "文件操作",
        link: `${PYTHON_ROOT}/__base__/file-operations`,
      },
    ],
  },

  {
    text: "功能扩展",
    collapsed: false,
    items: [
      {
        text: "Requests",
        link: `https://requests.readthedocs.io/en/latest/`,
      },
      // {
      //   text: "Pandas",
      //   link: ``,
      // },
      // {
      //   text: "NumPy",
      //   link: ``,
      // },
      // {
      //   text: "Matplotlib",
      //   link: ``,
      // },
    ],
  },

  {
    text: "返回首页",
    link: `${PYTHON_ROOT}/`,
  },
];
