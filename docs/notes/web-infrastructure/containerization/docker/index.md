---
prev: false
next: false
---

# Docker

![](/static/skill-images/web-infrastructure--docker.png)

Docker 是一种容器引擎，比虚拟机更轻量 ( 使用的是宿主机的操作系统内核 )

容器中运行的应用程序与宿主机的环境隔离 ( 各个容器有独立的文件系统、网络栈、进程空间 )

## 下载安装

可以使用可视化桌面应用 [Docker Desktop](https://docs.docker.com/desktop/setup/install/mac-install/)

```zsh
% docker --version                     # [!code focus]
Docker version 25.0.3, build 4debf41
```

## 架构组成

:::code-group

```txt [Docker 架构组成]
   Docker Client                          Docker Host
┌────────────────┐    ┌────────────────────────────────────────────────────┐
│                │    │ ┌────────┐    ┌─────────────┐   ┌───────────────┐  │
│                │    │ │        │    │ ┌─────────┐ │   │ ┌───────────┐ │  │
│                │    │ │        │    │ │  Image ─┼─┼───┼─▶ Container │ │  │
│                │    │ │        │    │ ├─────────┤ │   │ ├───────────┤ │  │
│                │    │ │       ─┼───▶│ │  Image ─┼─┼───┼─▶ Container │ │  │
│                │    │ │ Docker │    │ ├─────────┤ │   │ ├───────────┤ │  │
│                │    │ │ Deamon │    │ │  Image ─┼─┼───┼─▶ Container │ │  │
│  CLI Commands  │────┼─┼─▶      │    │ └─────────┘ │   │ └───────────┘ │  │
│                │    │ │        │    └──────▲──────┘   └───────▲───────┘  │
│                │    │ │        │           │                  │          │
│                │    │ │        │           │ Volume           │ Network  │
│                │    │ │        │           │                  │          │
│                │    │ │        │   ┌───────▼───────┐  ┌───────▼────────┐ │
│                │    │ │        │   │ Volume Driver │  │ Network Driver │ │
│                │    │ │   ▲    │   └───────────────┘  └────────────────┘ │
│                │    │ └───┼────┘                                         │
└────────────────┘    └─────┼──────────────────────────────────────────────┘
                            │
                ┌───────────▼──────────┐
                │       DockerHub      │
                │  ( Images Registry ) │
                └──────────────────────┘
```

:::
