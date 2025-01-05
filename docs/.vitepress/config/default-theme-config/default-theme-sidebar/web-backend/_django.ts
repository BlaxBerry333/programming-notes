import { type DefaultTheme } from "vitepress";

export const DJANGO_ROOT = `/notes/web-backend/frameworks/django`;

export const DJANGO_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Django 基础",
    collapsed: false,
    items: [
      {
        text: "路由",
        link: `${DJANGO_ROOT}/__base__/url`,
      },
      {
        text: "视图 ( View )",
        link: `${DJANGO_ROOT}/__base__/mtv/view`,
      },
      {
        text: "模型 ( Model )",
        link: `${DJANGO_ROOT}/__base__/mtv/model`,
      },
      {
        text: "模版 ( Template )",
        link: `${DJANGO_ROOT}/__base__/mtv/template`,
      },
      {
        text: "后台管理系统",
        link: `${DJANGO_ROOT}/__base__/project-admin`,
      },
      {
        text: "项目配置",
        link: `${DJANGO_ROOT}/__base__/project-settings`,
      },
      // {
      //   text: "身份认证与权限",
      //   link: `${DJANGO_ROOT}/__base__/authentication-authorization`,
      // },
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
        link: `${DJANGO_ROOT}/__extensions__/django-rest-framework/`,
      },
      {
        text: "django-allauth",
        link: `https://zenn.dev/mom/books/4c7430e6a7b321/viewer/76c6b9`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${DJANGO_ROOT}/`,
  },
];
