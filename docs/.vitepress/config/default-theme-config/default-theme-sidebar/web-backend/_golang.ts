import { type DefaultTheme } from "vitepress";

export const GOLANG_ROOT = "/notes/web-backend/languages/golang";

export const GOLANG_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Golang 基础",
    collapsed: false,
    items: [
      {
        text: "项目构建、包管理",
        collapsed: true,
        items: [
          {
            text: "Go Modules",
            link: `${GOLANG_ROOT}/__base__/pkgs-management/go-modules`,
          },
        ],
      },
      {
        text: "数据类型",
        collapsed: true,
        items: [
          {
            text: "值数据类型",
            link: `${GOLANG_ROOT}/__base__/data-types/primitive-types`,
          },
          {
            text: "引用数据类型",
            link: `${GOLANG_ROOT}/__base__/data-types/reference-types`,
          },
          {
            text: "类型操作",
            link: `${GOLANG_ROOT}/__base__/data-types/type-operations`,
          },
        ],
      },
      {
        text: "变量",
        link: `${GOLANG_ROOT}/__base__/variable`,
      },
      {
        text: "函数",
        link: `${GOLANG_ROOT}/__base__/function`,
      },
      {
        text: "运算符",
        link: `${GOLANG_ROOT}/__base__/operators`,
      },
      {
        text: "流程控制",
        link: `${GOLANG_ROOT}/__base__/control-flow`,
      },
      {
        text: "模块开发",
        collapsed: true,
        items: [
          {
            text: "包、模块、工作区",
            link: `${GOLANG_ROOT}/__base__/modules-dev/package-module-workspace`,
          },
          {
            text: "常用内置包",
            collapsed: true,
            link: `${GOLANG_ROOT}/__base__/modules-dev/builtin-packages`,
          },
        ],
      },
    ],
  },

  {
    text: "返回首页",
    link: `${GOLANG_ROOT}/`,
  },
];
