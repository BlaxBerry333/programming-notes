import { type DefaultTheme } from "vitepress";

export const DOCKER_ROOT = "/notes/web-infrastructure/containerization/docker";
export const DOCKER_COMPOSE_ROOT =
  "/notes/web-infrastructure/containerization/docker-compose";

export const DOCKER_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Docker 基础",
    collapsed: false,
    items: [
      {
        text: "镜像 ( Image )",
        link: `${DOCKER_ROOT}/__base__/image`,
      },
      {
        text: "容器 ( Container )",
        link: `${DOCKER_ROOT}/__base__/container`,
      },
      {
        text: "映射与挂载",
        link: `${DOCKER_ROOT}/__base__/data-mapping-mounting`,
      },
      {
        text: "通信与网络",
        link: `${DOCKER_ROOT}/__base__/data-communication-network`,
      },
    ],
  },

  {
    text: "Docker 编排",
    collapsed: false,
    items: [
      {
        text: "Docker Compose",
        link: `${DOCKER_COMPOSE_ROOT}/`,
      },
    ],
  },

  {
    text: "返回首页",
    link: `${DOCKER_ROOT}/`,
  },
];
