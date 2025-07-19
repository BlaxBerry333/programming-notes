---
prev: false
next: false
---

# MinIO

![](/static/skill-images/web-database--minio.png)

MinIO 是一个可用于大规模数据存储的分布式对象存储系统 ( Object Storage Service )

以对象 Object 为单位来处理数据本身以及用于描述的元数据

## 下载安装

::: code-group

```zsh [Docker Compose]
% cd 项目名

# 0. 创建 docker-compose.yml 文件                     # [!code focus:20]
% echo '
services:
  服务名:
    image: minio/minio
    container_name: 容器名
    command: server /data --console-address ":9001"
    ports:
      - 宿主机端口号:9000
      - 宿主机端口号:9001
    volumes:
      - 数据卷名:/data
    networks:
      - 网络名
volumes:
  数据卷名:{}
networks:
  网络名:
    driver: bridge
' > docker-compose.yml

# 1. 创建并运行服务                                                            # [!code focus:2]
% docker compose -f ./docker-compose.yml -p 项目名 up -d 服务名

# 2. 进入容器                                                                 # [!code focus:3]
% docker-compose -f ./docker-compose.yml -p 项目名 exec 服务名 bash
root@容器ID:/data# mc --version
mc version RELEASE.2025-05-21T01-59-54Z (commit-id=f71ad84bcf0fd4369691952af5d925347837dcec)
Runtime: go1.24.3 linux/arm64
Copyright (c) 2015-2025 MinIO, Inc.
License GNU AGPLv3 <https://www.gnu.org/licenses/agpl-3.0.html>

# 3. 退出容器                                                                 # [!code focus:2]
root@容器ID:/data# exit

# 4. 停止并并删除服务 ( 保留数据卷 )                                             # [!code focus:2]
% docker compose  -f ./docker-compose.yml -p 项目名 down

# 5. 停止并并删除服务 ( 彻底清空 )                                               # [!code focus:2]
% docker compose -f ./docker-compose.yml -p 项目名 down -v
```

:::

## 相关链接

[Minio基础教学](https://www.bilibili.com/video/BV1Gx4y1Y7Rg/?spm_id_from=333.788.player.switch&vd_source=8960252a3845b76b699282b11f36ab5c&p=1)
