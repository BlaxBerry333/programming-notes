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

```zsh
% docker-compose --version
Docker Compose version v2.24.6-desktop.1
```

## 常用命令

### 创建并启动

创建并启动`docker-compose.yaml`配置文件中的所有服务

```zsh
% docker-compose \
    -f [配置文件路径] \
    -p [项目名] \
    up \
    -d
```

---

### 启动

启动已存在的服务

```zsh
% docker-compose \
    -f [配置文件路径] \
    -p [项目名] \
    start \
    [服务名1] [服务名2]
```

---

### 重启

重新启动已存在的服务

```zsh
% docker-compose \
    -f [配置文件路径] \
    -p [项目名] \
    restart
```

---

### 停止

停止运行中的服务

```zsh
% docker-compose \
    -f [配置文件路径] \
    -p [项目名] \
    stop
```

---

### 移除

停止并删除所有服务，以及创建的网络

```zsh
% docker-compose \
    -f [配置文件路径] \
    -p [项目名] \
    down
```
