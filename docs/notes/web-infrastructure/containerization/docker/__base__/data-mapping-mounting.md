# Docker 数据映射与挂载

## 数据卷映射

通过数据卷 ( Volume ) 映射容器中的数据到宿主机后，可实现容器数据的持久化

数据卷在容器被删除后任然保留，并且可以在多个容器之间共享

```zsh
% docker run \
    # 其他选项
    -v [数据卷名]:[容器中路径] \
    [镜像名:版本]
```

::: details 例子：使用数据卷持久化 PostgreSQL 容器中的数据

```zsh
% docker run \
    --name sample_db \
    -p 5432:5432 \
    -v sample_db—_data:/var/lib/postgresql/data \       # [!code hl]
    -d \
    postgres
```

:::

::: details 例子：使用数据卷持久化 Nginx 容器中的配置信息

```zsh
% docker run \
    --name sample-nginx \
    -p 80:80 \
    -v /app/xxx:/usr/share/nginx/html \
    -v sample-nginx-config:/etc/nginx \                 # [!code hl]
    -d \
    nginx
```

:::

## 目录挂载

在启动容器时将宿主机中的某个目录挂载到容器中，并保持二者的实时同步

在容器内外对该目录进行修改时都会影响并立即反应给另一方

```zsh
% docker run \
    # 其他选项
    -v [宿主机中路径]:[容器中路径] \
    [镜像名:版本]
```

::: details 例子：将宿主机的`/app/xxx/`挂载到 Nginx 容器中的`/usr/share/nginx/html/`

```zsh
# 在宿主机中创建目录与文件
% mkdir /app/xxx && cd /app/xxx
% echo "Hello" > index.html

# 启动容器，并将宿主机中目录挂载到容器
% docker run \
    --name sample-nginx \
    -p 80:80 \
    -v /app/xxx:/usr/share/nginx/html \         # [!code hl]
    -v sample-nginx-config:/etc/nginx \
    -d \
    nginx
```

:::

::: details 例子：基于当前项目目录中的 Dockerfile 创建容器，并将当前目录挂载到容器中的`/app/`

```zsh
% cd sample_project

# 构建容器镜像
% docker build \
    -t sample_project:1.0.0 \
    -f ./Dockerfile \
    .

# 启动容器，并挂载当前目录挂载到容器
% docker run \
    --name sample_project \
    -p 8080:8080 \
    -v $(pwd):/app \                                 # [!code hl]
    -d \
    sample_project:1.0.0
```

::: code-group

```[目录结构]
sample_project/
├─ ...
└─ Dockerfile
```

:::

## 常用数据卷命令

### 查看

```zsh
# 查看所有的数据卷
% docker volume ls

# 查看所有的数据卷的ID
% docker volume ls -q
```

---

### 删除

删除数据卷

```zsh
# 删除一个数据卷
% docker volume rm [数据卷名]

# 删除所有的数据卷
% docker volume rm ${docker volume ls -q}
```
