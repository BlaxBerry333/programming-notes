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
% python -m venv [虚拟环境]
% source [虚拟环境]/bin/activate

# 2. 在虚拟环境中下载安装 Django
(虚拟环境) % pip install Django==4.2.16

# 3. 在虚拟环境中检查 Django 的版本
(虚拟环境) % python -m django --version
(虚拟环境) 4.2.16
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
Client │                 │                                │  │ Database
───────┼────▶  url  ─────┼───▶  View  ◀─────▶  Model  ────┼──┼────────▶
       │                 │       │ │             ▲        │  │
◀──────┼──( JSON Data )──┼───────┘ │             │        │  │
       │                 │         ▼             │        │  │
◀──────┼──( HTML Page )──┼──── Template          │        │  │
       │                 │                       │        │  │
       │                 └───────────────────────┼────────┘  │
       │                                         |           │
       │                 ┌───────────────────────▼────────┐  │
       │                 │           Django Admin         │  │
       │                 └────────────────────────────────┘  │
       └─────────────────────────────────────────────────────┘
```

:::

## 项目初始化

项目名使用小写蛇形命名 ( snake_case )

::: code-group

```zsh [新目录]
(虚拟环境) % django-admin startproject [项目名]
(虚拟环境) % cd [项目名]

(虚拟环境) % python manage.py runserver  # 默认 8000 端口
(虚拟环境) % python manage.py runserver [自定端口号]
```

```zsh [现有目录]
% cd [项目名]                                          # [!code focus]
% python -m venv [虚拟环境]
% source [虚拟环境]/bin/activate
(虚拟环境) % django-admin startproject [主应用名] .      # [!code focus:4]

(虚拟环境) % python manage.py runserver  # 默认 8000 端口
(虚拟环境) % python manage.py runserver [自定端口号]
```

:::

## 项目目录结构

目录与文件使用小写蛇形命名 ( snake_case )

Django 项目采用模块化的方式组织代码，具体的功能都定应为对应的应用 ( Application )

::: code-group

```[目录结构]
[项目目录]
├─ manage.py                # Django 命令行工具
│
├─ [主应用]/
│   ├─ __init__.py
│   ├─ settings.py          # 项目配置文件
│   ├─ urls.py              # 项目的主路由
│   ├─ asgi.py              # ASGI 服务器的入口文件
│   └─ wsgi.py              # WSGI 服务器的入口文件
│
├─ [自定义应用]/
│   ├─ __init__.py
│   ├─ migrations/
│   │   ├─ __init__.py
│   │   ├─ [迁移文件].py
│   │   └─ ...
│   ├─ models/              # 该应用的相关模型
│   │   ├─ __init__.py
│   │   ├─ [模型文件].py
│   │   └─ ...
│   ├─ views/               # 该应用的相关视图
│   │   ├─ __init__.py
│   │   ├─ [视图文件].py
│   │   └─ ...
│   ├─ apps.py              # 声明该应用的配置类
│   ├─ urls.py              # 该应用的相关路由与视图的映射关系
│   ├─ admin.py             # 该应用的模型在 Admin 页面上的展示
│   └─ ...
│
├─ [自定义应用]/
│   └─ ...
│
├─ [自定义应用]/
│   └─ ...
│
└─ ...
```

:::

::: details 例子：项目初始时的默认目录结构

```
[项目目录]
├─ manage.py
│
└─ [项目同名主应用]/
    ├─ __init__.py
    ├─ settings.py
    ├─ urls.py
    ├─ asgi.py
    └─ wsgi.py
```

:::

## 项目应用

> Application

项目中可以存在一个主应用外加多个自定义应用，主应用在项目初始化时会自动创建

自定义应用是个模块目录，其中可以包含与某具体功能相关的 [路由](./__base__/url.md)、[模型](./__base__/mtv/model.md)、[视图](./__base__/mtv/template.md)、[模板](./__base__/mtv/template.md)

---

### 创建应用

自定义应用名使用小写蛇形命名 ( snake_case )

```zsh
(虚拟环境) % cd [项目名]
(虚拟环境) % python manage.py startapp [应用名]
```

创建自定义应用后其目录内会自动生成基础的几个文件，可按需进行修改

此外，自定义应用在创建后需要将注册到项目主应用的配置文件中，否则无法被 Django 自动识别

```
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ [自定义应用]/              # [!code ++:12]
    ├─ __init__.py
    ├─ migrations/          # 该应用的数据迁移文件目录
    │   ├─ __init__.py
    │   ├─ [迁移文件].py
    │   └─ ...
    ├─ apps.py              # 声明该应用的配置类
    ├─ urls.py              # 该应用的相关路由与视图的映射关系
    ├─ models.py            # 该应用的相关模型
    ├─ views.py             # 该应用的相关视图
    └─ admin.py             # 该应用的模型在 Admin 页面上的展示
```

::: details 例子：在一个 Django 项目中追加两个自定义应用

::: code-group

```zsh [命令]
% python -m venv .venv
% source .venv/bin/activate
(.venv) % django-admin startproject demo_1
(.venv) % cd demo_1
(.venv) % python manage.py startapp xxxx
(.venv) % python manage.py startapp yyyy
```

```[目录结构]
demo_1
├─ manage.py
│
├─ demo_1/
│   ├─ __init__.py
│   ├─ settings.py
│   ├─ urls.py
│   ├─ asgi.py
│   └─ wsgi.py
│
├─ xxxx/                        # [!code ++:9]
│   ├─ migrations/
│   │   └─ __init__.py
│   ├─ __init__.py
│   ├─ admin.py
│   ├─ apps.py
│   ├─ models.py
│   ├─ tests.py
│   └─ views.py
│
└─ yyyy/                        # [!code ++:9]
    ├─ migrations/
    │   └─ __init__.py
    ├─ __init__.py
    ├─ admin.py
    ├─ apps.py
    ├─ models.py
    ├─ tests.py
    └─ views.py
```

:::

---

### 注册应用

Django 项目中使用的所有应用都应该注册到项目主应用的配置文件中，否则无法被自动识别

仅需将应用名称添加追加到主应用配置文件`setings.py`的`INSTALLED_APPS`变量中

::: code-group

```py [主应用/settings.py]
INSTALLED_APPS = [                      # [!code focus:2]
    # Django 内置应用
    "django.contrib.admin",             # 管理系统，用于可视化管理 Models 数据，并实现对数据库的 CRUD 操作
    "django.contrib.auth",              # 处理用户认证和权限管理
    "django.contrib.contenttypes",      # 允许处理不同模型的多态关系，支持内容类型的动态处理
    "django.contrib.sessions",          # 提供会话框架，以保持用户状态
    "django.contrib.messages",          # 允许在请求之间传递临时消息，比如表单提交后的反馈
    "django.contrib.staticfiles",       # 处理静态文件的管理

    # 第三方包                           # [!code focus:8] # [!code ++:7]
    "应用名1",
    "应用名2",

    # 自定义应用
    "自定义应用1",
    "自定义应用2",
]
```

:::
