# Docker 容器

> Docker Container

容器需要基于镜像 ( Image ) 才能创建

每一个容器都可视为一个隔离中的应用程序

## 常用容器命令

### 创建

基于一个镜像创建并启动一个容器

```zsh
% docker run \
    --name [自定义容器名] \     # 自定义创建的容器的名称
    -p [宿主机端口:容器端口] \   # 映射主机的端口到容器内的端口
    -e [环境变量]=[值] \        # 设定容器内应用使用的环境变量
    -d \                      # 在后台运行创建的容器
    --rm \                    # 容器停止运行后会自动删除
    [镜像名:版本]
```

> [!IMPORTANT] 执行顺序
>
> 1. 若本地存在目标镜像，则直接创建
> 2. 本地不存在目标镜像，则会尝试从 DockerHub 下载镜像
> 3. 若本地与 DockerHub 都不存在目标镜像，则报错

|   常用参数选项   | 说明                                                                                                   |
| :--------------: | ------------------------------------------------------------------------------------------------------ |
|     `--name`     | 指定容器的自定义名称                                                                                   |
|      `--rm`      | 容器停止运行后会自动删除不保留在本地，适用于用完即删的测试                                             |
|       `-d`       | 后台运行容器                                                                                           |
|      `-it`       | 使用交互式运行容器后进入容器                                                                           |
|       `-e`       | 指定环境变量                                                                                           |
|       `-P`       | 随机指定容器的运行端口                                                                                 |
|       `-p`       | 指定容器的运行端口<br/>容器默认无法像从外界直接访问，必须将其端口映射到宿主机                          |
|       `-v`       | 挂载数据卷，可将容器内数据与主机某位置映射<br/>不指定主机路径时数据卷默认存于`/var/lib/docker/volumes` |
| `--volumes-from` | 挂载来自指定父容器的数据卷，以实现容器将数据共享                                                       |
|   `--network`    | 指定该容器连接的网络                                                                                   |

::: details 例子：基于 Nginx 的官方镜像创建一个临时容器后并在后台运行

```zsh
% docker run -p 8000:80 --rm -d nginx
% curl localhost:8000
```

:::

::: details 例子：基于 mySQL 的官方镜像创建并运行容器后进入容器登陆数据库

```zsh
% docker run \
    --name sample-db \
    -d \
    -p 3306:3306 \
    -e MYSQL_USER=xxxxx \
    -e MYSQL_ROOT_PASSWORD=123456 \
    mysql:8.0

% docker exec -it sample-db /bin/bash
bash-[版本号]# mysql -u xxxxx -p
Enter password: 123456
# ...
mysql> # ...
mysql> # ...
```

:::

::: details 例子：基于 AlmaLinux 的官方镜像以交互式创建并运行容器

```zsh
% docker run \
    --name sample—almalinux \
    -d \
    -it \
    almalinux

[root@容器ID /]# ...
[root@容器ID /]# exit
```

:::

---

### 查看列表

查看本地的容器

```zsh
# 仅查看所有运行中的容器
% docker ps

# 查看所有的容器
% docker ps -a

# 查看所有的容器的ID
% docker ps -aq
```

::: details 例子：查看本地所有的容器 (运行中的以及未使用的 )

```zsh
% docker ps -a
CONTAINER ID   IMAGE      COMMAND                  CREATED       STATUS                    PORTS     NAMES
8f31bd9be1a4   postgres   "docker-entrypoint.s…"   6 days ago    Exited (0) 24 hours ago             study-postgres
9efbcc7cf4df   redis      "docker-entrypoint.s…"   6 days ago    Exited (0) 6 days ago               study-redis
26cb57d7d717   nginx      "/docker-entrypoint.…"   6 days ago    Exited (0) 6 days ago               study-nginx
0958b44f9c05   mysql      "docker-entrypoint.s…"   4 weeks ago   Exited (0) 6 days ago               study-mysql
cf26176cca48   mongo      "docker-entrypoint.s…"   4 weeks ago   Exited (0) 6 days ago               study-mongodb
```

:::

---

### 停止

停止一个运行中的本地容器

```zsh
% docker stop [容器名]

% docker stop [容器ID]
```

---

### 启动

启动一个本地容器

```zsh
% docker start [容器名]

% docker start [容器ID]
```

---

### 重启

重新启动一个本地容器

```zsh
% docker restart [容器名]

% docker restart [容器ID]
```

---

### 删除

删除本地的容器

```zsh
# 删除一个容器
% docker rm [容器名]
% docker rm [容器ID]

# 删除所有的容器
% docker rm $(docker ps -aq)
```

> [!CAUTION] 删除使用中的容器时会报错，若想强制删除可通过选项<code>-f</code>
>
> > 如下：结合 Shell 命令强制删除所有的容器
>
> ```zsh
> % docker rm -f $(docker ps -aq)
> ```

---

### 日志

查看容器的日志信息

```zsh
% docker logs [容器名]

% docker logs [容器ID]
```

---

### 进入

进入一个容器内容

可使通过选项`-it`以交互方式开启开启一个新进程

```zsh
% docker exec -it [容器名] bash

% docker exec -it [容器ID] bash
```

```zsh
root@[容器ID]:/# ...              # 在该容器内执行的命令
root@[容器ID]:/# exit             # 退出该容器
```
