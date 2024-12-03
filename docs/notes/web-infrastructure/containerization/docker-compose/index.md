---
prev: false
next: false
---

# Docker Compose

![](/static/skill-images/web-infrastructure--docker-compose.png)

Docker Compose 是一个容器编排工具 ( 自动化部署等 )

可通过一个`docker-compose.yaml`配置文件实现对 Docker 容器的批量处理

## 下载安装

可以使用可视化桌面应用 [Docker Desktop](https://docs.docker.com/desktop/setup/install/mac-install/)

> 如下：本文使用的 Docker Compose v2.31.0 + Docker v27.4.0 + Docker Desktop v4.37.2

```zsh
% docker compose version                        # [!code focus]
Docker Compose version v2.31.0-desktop.2
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

## 常用命令

> [!CAUTION] 新版命令变化
>
> ```diff
> - % docker-compose [选项]     # Docker Compose V1
> + % docker compose [选项]     # Docker Compose V2
> ```

---

### 创建并启动

创建并启动`docker-compose.yaml`配置文件中的所有服务

```zsh
% docker compose \
    -f [配置文件路径] \
    -p [项目名] \
    up \
    -d
```

---

### 启动

启动已存在的服务

```zsh
% docker compose \
    -f [配置文件路径] \
    -p [项目名] \
    start \
    [服务名1] [服务名2]
```

---

### 重启

重新启动已存在的服务

```zsh
% docker compose \
    -f [配置文件路径] \
    -p [项目名] \
    restart
```

---

### 停止

停止运行中的服务

```zsh
% docker compose \
    -f [配置文件路径] \
    -p [项目名] \
    stop
```

---

### 移除

停止并删除所有服务，以及创建的网络

```zsh
% docker compose \
    -f [配置文件路径] \
    -p [项目名] \
    down
```
