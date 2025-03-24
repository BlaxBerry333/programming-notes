# Docker 镜像

> Docker Image

镜像可用于创建容器 ( Container )

镜像可以从官方仓库 DockerHub 下载，也可以通过 Dockerfile 自定义镜像

## 常用镜像命令

### 创建

基于一个`Dockerfile`文件创建一个本地镜像

```zsh
% docker build \
    -t [镜像名:版本] \
    -f [路径]/[Dockerfile所在目录] \
    [执行该命令的当前目录]
```

::: details 例子：基于当前项目目录中的 Dockerfile 创建容器

```zsh
% cd sample_project
% docker build \
    -t sample-image:1.0.0 \
    -f ./Dockerfile \
    .
```

::: code-group

```[目录结构]
sample_project/
├─ ...
└─ Dockerfile
```

:::

---

### 查看

查看本地的镜像

```zsh
# 仅查看所有使用中的镜像
% docker images

# 查看所有的镜像
% docker images -a

# 查看所有的镜像的ID
% docker images -aq

# 查看指定镜像
% docker images [镜像名]
% docker images [镜像名:版本]
```

::: details 例子：查看本地所有的镜像 ( 使用中的以及未使用的 )

```zsh
% docker images -a
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    786a14303c96   2 weeks ago    193MB
centos       latest    e6a0117ec169   2 years ago    272MB
centos       7         c9a1fdca3387   2 years ago    301MB
```

:::

---

### 删除

删除本地的镜像

```zsh
# 删除一个镜像
% docker rmi [镜像名]
% docker rmi [镜像ID]

# 删除所有的镜像
% docker rm $(docker images -aq)
```

> [!CAUTION] 删除使用中的镜像时会报错，若想强制删除可通过选项<code>-f</code>
>
> > 如下：结合 Shell 命令强制删除所有的镜像
>
> ```zsh
> % docker rmi -f $(docker images -aq)
> ```

---

### 查询

从 DockerHub 查找相关的镜像

```zsh
% docker search [镜像名]
```

::: details 例子：查看可下载的 python 镜像包

```zsh
% docker search python
NAME             DESCRIPTION                                     STARS     OFFICIAL
python           Python is an interpreted, interactive, objec…   9940      [OK]
circleci/python  Python is an interpreted, interactive, objec…   95
cimg/python                                                      22
bitnami/python   Bitnami container image for Python              29
okteto/python                                                    0
ubuntu/python    A chiselled Ubuntu rock with the Python runt…   19
# ...
```

:::

---

### 下载

从 DockerHub 下载指定的镜像到本地

不指定镜像版本 ( Tags ) 时默认下载最新版本

```zsh
# 不指定镜像版本 ( Tags ) 时默认下载最新版本
% docker pull [镜像名]

# 下载指定版本的镜像
% docker pull [镜像名:版本]
```

---

### 上传

将本地的镜像上传到 DockerHub

```zsh
% docker push [用户名]/[镜像名]:[版本]
```
