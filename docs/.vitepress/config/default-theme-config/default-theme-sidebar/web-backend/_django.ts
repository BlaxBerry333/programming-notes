import { type DefaultTheme } from "vitepress";

export const DJANGO_ROOT = `/notes/web-backend/frameworks/django`;

export const DJANGO_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Django 基础",
    collapsed: false,
    items: [
      {
        text: "应用 ( Application )",
        link: `${DJANGO_ROOT}/__base__/application`,
      },
      {
        text: "路由 ( urls )",
        link: `${DJANGO_ROOT}/__base__/urls`,
      },
      {
        text: "模型 ( Model )",
        link: `${DJANGO_ROOT}/__base__/mtv-model`,
      },
      {
        text: "视图 ( View )",
        link: `${DJANGO_ROOT}/__base__/mtv-view`,
      },
      {
        text: "模版 ( Template )",
        link: `${DJANGO_ROOT}/__base__/mtv-template`,
      },
      {
        text: "管理系统 ( Admin )",
        link: `${DJANGO_ROOT}/__base__/admin`,
      },
      {
        text: "身份认证与权限",
        link: `${DJANGO_ROOT}/__base__/authentication-authorization`,
      },
      {
        text: "项目配置",
        link: `${DJANGO_ROOT}/__base__/project-settings`,
      },
      // {
      //   text: "项目部署",
      //   link: `${DJANGO_ROOT}/__base__/project-deployment`,
      // },
    ],
  },

  {
    text: "功能扩展",
    collapsed: false,
    items: [
      {
        text: "Django REST Framework",
        link: `${DJANGO_ROOT}/__extensions__/django-rest-framework`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${DJANGO_ROOT}/`,
  },
];
