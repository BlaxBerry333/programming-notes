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

> 如下：本文使用的 Docker v27.4.0 + Docker Desktop v4.37.2

```zsh
% docker --version                              # [!code focus]
Docker version 27.4.0, build bde2b89
% docker version                                # [!code focus]
Client:
 Version:           27.4.0
 API version:       1.47
 Go version:        go1.22.10
 Git commit:        bde2b89
 Built:             Sat Dec  7 10:35:43 2024
 OS/Arch:           darwin/arm64
 Context:           desktop-linux

Server: Docker Desktop 4.37.2 (179585)
 Engine:
  Version:          27.4.0
  API version:      1.47 (minimum version 1.24)
  Go version:       go1.22.10
  Git commit:       92a8393
  Built:            Sat Dec  7 10:38:33 2024
  OS/Arch:          linux/arm64
  Experimental:     false
 containerd:
  Version:          1.7.21
  GitCommit:        472731909fa34bd7bc9c087e4c27943f9835f111
 runc:
  Version:          1.1.13
  GitCommit:        v1.1.13-0-g58aa920
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
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
