import { type DefaultTheme } from "vitepress";

export const TS_ROOT = "/notes/web-frontend/languages/typescript";

export const TS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "TypeScript 基础",
    collapsed: false,
    items: [
      {
        text: "数据类型",
        link: `${TS_ROOT}/__base__/data-types`,
      },
      {
        text: "类型操作",
        link: `${TS_ROOT}/__base__/type-operation`,
      },
      {
        text: "泛型",
        link: `${TS_ROOT}/__base__/generics`,
      },
      {
        text: "内置工具类型",
        link: `${TS_ROOT}/__base__/utility-types`,
      },
    ],
  },

  {
    text: "功能扩展",
    collapsed: false,
    items: [
      {
        text: "Zod",
        // link: `${TS_ROOT}/__extensions__/zod`,
        link: `https://zenn.dev/terrierscript/books/2023-01-typed-zod/viewer/0-1-introduction`,
      },
      {
        text: "tRPC",
        link: `/notes/web-backend/api/trpc/`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${TS_ROOT}/`,
  },
];
