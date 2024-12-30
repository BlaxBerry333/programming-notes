---
prev: false
next: false
---

# Django

![](/static/skill-images/web-backend--django.png)

Django 是一个基于 Python 的 Web 框架

## 下载安装

::: code-group

```zsh [虚拟环境]
% cd [项目目录]                                 # [!code focus:11]

# 1. 在项目中创建并启用虚拟环境
% python -m venv .venv
% source .venv/bin/activate

# 2. 在虚拟环境中下载安装 Django
(.venv) % pip install Django==4.2.16

# 3. 在虚拟环境中检查 Django 的版本
(.venv) % python -m django --version
(.venv) 4.2.16
```

```zsh [Docker]
% cd [项目目录]                                                # [!code focus:31]

# 1. 创建第三方依赖记录文件
% echo 'Django==4.2.16' > requirements.txt

# 2. 创建 Dockerfile
% echo '
FROM python:3.10.0-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "manage.py", "runserver", "8080"]
' > Dockerfile

# 3. 创建项目的自定义镜像
% docker build \
    -t [项目镜像名:版本] \
    -f ./Dockerfile \
    .

# 4. 创建并启动项目的自定义镜像容器
% docker run \
    --name [项目容器名] \
    -e [环境变量]=[值] \
    -d \
    [项目镜像:版本]

# 5. 进入容器中检查 Django 的版本
% docker exec -it [项目容器名] bash
root@[项目容器ID]:/# python -m django --version
4.2.16
```

:::

## 架构组成

::: code-group

```txt[Django 架构组成]
                            Django Server
       ┌─────────────────────────────────────────────────────┐
       │                 ┌────────────────────────────────┐  │
       │                 │           Application          │  │
       │                 └────────────────────────────────┘  │
       │                 ┌────────────────────────────────┐  │
       │                 │           Application          │  │
Client │                 │                                │  │  Database
───────┼───▶  urls  ─────┼───▶  Views  ◀────▶  Models  ───┼──┼────────▶
       │                 │        │              ▲        │  │
◀──────┼──( JSON Data )──┼────────┤              │        │  │
       │                 │        │              │        │  │
◀──────┼──( HTML Page )──┼──── Templates         │        │  │
       │                 │                       │        │  │
       │                 └───────────────────────┼────────┘  │
       │                                         ▼           │
       │                       ┌─────────────────────┐       │
       │                       │     Django Admin    │       │
       │                       └─────────────────────┘       │
       └─────────────────────────────────────────────────────┘
```

:::

## 相关链接

- [Django5路由变量](https://www.bilibili.com/video/BV14Z421z78C/?spm_id_from=333.788.player.switch&vd_source=8960252a3845b76b699282b11f36ab5c&p=16)
- [Django认证](https://pythondjango.cn/django/rest-framework/6-authentication/#%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB%E6%97%B6%E4%B8%BA%E4%BD%95%E6%8E%A8%E8%8D%90token%E8%AE%A4%E8%AF%81)
- [DRF入门](https://www.bilibili.com/video/BV1k5411p7Kp/?spm_id_from=333.337.search-card.all.click&vd_source=8960252a3845b76b699282b11f36ab5c)
- [DRF认证](https://www.bilibili.com/video/BV1Dm4y1c7QQ/?spm_id_from=333.788.player.switch&vd_source=8960252a3845b76b699282b11f36ab5c&p=17)
