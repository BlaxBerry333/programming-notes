import { type DefaultTheme } from "vitepress";

export const DOCKER_ROOT = "/notes/web-infrastructure/containerization/docker";

export const DOCKER_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Docker 基础",
    collapsed: false,
    items: [],
  },

  {
    text: "返回首页",
    link: `${DOCKER_ROOT}/`,
  },
];
