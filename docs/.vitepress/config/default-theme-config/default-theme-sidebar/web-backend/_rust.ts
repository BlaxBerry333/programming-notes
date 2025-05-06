import { type DefaultTheme } from "vitepress";

export const RUST_ROOT = "/notes/web-backend/languages/rust";

export const RUST_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Rust 基础",
    collapsed: false,
    items: [
      {
        text: "项目构建、包管理",
        collapsed: true,
        items: [
          {
            text: "Cargo",
            link: `${RUST_ROOT}/__base__/pkgs-management/cargo`,
          },
        ],
      },

      {
        text: "内存管理、所有权",
        link: `${RUST_ROOT}/__base__/memory-ownership`,
      },
      {
        text: "数据类型",
        collapsed: true,
        items: [
          {
            text: "标量类型",
            link: `${RUST_ROOT}/__base__/data-types/scalar-types`,
          },
          {
            text: "复合类型",
            link: `${RUST_ROOT}/__base__/data-types/compound-types`,
          },
          {
            text: "字符串",
            link: `${RUST_ROOT}/__base__/data-types/string-types`,
          },
          {
            text: "数据类型操作",
            link: `${RUST_ROOT}/__base__/data-types/__type-operations`,
          },
        ],
      },


      {
        text: "注释与文档",
        link: `${RUST_ROOT}/__base__/comments-docs`,
      },
      {
        text: "变量",
        link: `${RUST_ROOT}/__base__/variable`,
      },
      {
        text: "函数",
        link: `${RUST_ROOT}/__base__/function`,
      },
      // {
      //   text: "运算符",
      //   link: `${RUST_ROOT}/__base__/operators`,
      // },
      {
        text: "流程控制",
        link: `${RUST_ROOT}/__base__/control-flow`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${RUST_ROOT}/`,
  },
];
