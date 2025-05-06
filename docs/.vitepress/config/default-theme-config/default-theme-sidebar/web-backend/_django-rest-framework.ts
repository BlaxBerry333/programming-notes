import { type DefaultTheme } from "vitepress";

export const DRF_ROOT = `/notes/web-backend/frameworks/django-rest-framework`;

export const DRF_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "DRF 基础",
    collapsed: false,
    items: [
      {
        text: "序列化器 ( Serializer )",
        link: `${DRF_ROOT}/__base__/serializer`,
      },
      {
        text: "视图集 ( Viewsets )",
        link: `${DRF_ROOT}/__base__/viewset`,
      },
      {
        text: "路由器 ( Router )",
        link: `${DRF_ROOT}/__base__/router`,
      },
    ],
  },

  {
    text: "相关技术",
    collapsed: false,
    items: [
      {
        text: "Django",
        link: `/notes/web-backend/frameworks/django`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${DRF_ROOT}/`,
  },
];
