# Django 项目配置

## 所处位置

Django 项目的配置位于主应用目录下

建议以模块化的形式组织，不建议全部定义在项目初始化时创建的主应用`settings.py`文件里

::: code-group

```[目录结构]
[项目目录]
├─ manage.py
│
└─ [主应用]/
    ├─ settings.py          # [!code --]
    └─ settings/            # [!code ++:5]
       ├─ __init__.py
       ├─ [配置1].py
       ├─ [配置2].py
       └─ ...
```

:::

## 常用配置项

### 基础配置项

```py
from pathlib import Path


#【 项目根路径 】
# 多用于在当前配置文件内拼接完整路径
# 使用下文默认值时要求当前的配置文件必须位于：项目根目录/主应用/setting.py
# --------------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent


#【 调试模式 】
# 默认为 True，生产环境时值必须为 False
# --------------------------------------------------------------------------------
DEBUG = True


#【 域名访问权限 】
# 生产环境时值必须指明可以访问当前项目的外部域名
# 生产环境时不建议使用 ["*"]
# --------------------------------------------------------------------------------
ALLOWED_HOSTS = []


#【 应用列表 】
# 项目中使用的所有的应用都要在此定义
# --------------------------------------------------------------------------------
INSTALLED_APPS = [
    "django.contrib.admin",             # 内置应用，用于可视化管理 Models 数据并实现对数据库的 CRUD 操作
    "django.contrib.auth",              # 内置应用，处理用户认证和权限管理
    "django.contrib.contenttypes",      # 内置应用，允许处理不同模型的多态关系并支持内容类型的动态处理
    "django.contrib.sessions",          # 内置应用，提供会话框架以保持用户状态
    "django.contrib.messages",          # 内置应用，允许在请求之间传递临时消息 ( 比如表单提交后的反馈 )
    "django.contrib.staticfiles",       # 内置应用，处理静态文件的管理
    "第三方包",
    "自定义应用",
]


#【 主路由文件路径 】
# 默认为主应用目录下的 urls.py
# --------------------------------------------------------------------------------
ROOT_URLCONF = "[主应用名].urls"
```

---

### 资源文件

```py
#【 静态资源路径 】
# 主要为不会变动的 CSS、JavaScript、图像等文件
# 默认存放在项目根目录下的 static 目录
# 请求访问路径默认为： 域名:端口号/static//[路径]/资源文件.后缀名
# --------------------------------------------------------------------------------
STATIC_URL = "static/"


#【 静态资源目录集合 】
# --------------------------------------------------------------------------------
# 若静态资源位置不在项目根目录下的 static 目录中时，需要全部指明所处路径
# 请求访问路径还基于 STATIC_URL 的值，默认为： 域名:端口号/static//[路径]/资源文件.后缀名
STATICFILES_DIRS = [
    BASE_DIR / "static/",
    BASE_DIR / "自定义路径/自定义路径",
    BASE_DIR / "自定义路径/自定义路径",
]


#【 静态资源的部署路径 】
# 生产环境时必须指明静态资源在服务器上的完整位置
# --------------------------------------------------------------------------------
STATIC_ROOT = BASE_DIR / "static/"


#【 媒体资源路径 】
# 主要为可能会改变的用户头像、歌曲、视频等文件
# 默认存放在项目根目录下的 media 目录
# 请求访问路径默认为： 域名:端口号/media/[路径]/资源文件.后缀名
# --------------------------------------------------------------------------------
MEDIA_URL = "media/"


#【 媒体资源的部署路径 】
# 生产环境时必须指明静媒体资源在服务器上的完整位置
# --------------------------------------------------------------------------------
MEDIA_ROOT = BASE_DIR / "media/"
```

此外还需要在项目主应用的路由中定义请求路径与资源文件的映射关系

::: code-group

```py [主应用/urls.py]
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static                          # [!code ++:2]
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)   # [!code ++]
```

:::

---

### 模型

```py
#【 默认模型中主键使用字段类型 】
# --------------------------------------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
```

---

### 数据库

```py
DATABASES = {
    "default": {
        # 设置数据库引擎
        # Django 默认支持 4 种：mysql、postgresql、orcale、sqlite3
        # --------------------------------------------------------------------------------
        "ENGINE": "数据库引擎",

        # 设置数据库的域名
        # 可指定 localhost，但是在 Docker Compose 开启多容器环境时需要指定为服务名
        # --------------------------------------------------------------------------------
        "HOST": "域名",

        # 设置数据库的端口号
        # --------------------------------------------------------------------------------
        "PORT": "端口号",

        # 设置数据库的连接用户名，按需求可省略
        # --------------------------------------------------------------------------------
        "USER": "自定义用户名",

        # 设置数据库的连接密码，按需求可省略
        # --------------------------------------------------------------------------------
        "PASSWORD": "自定义用户密码",

        # 设置数据库的名称，按需求可省略
        # --------------------------------------------------------------------------------
        "NAME": "自定义数据库名",
    }
}
```

::: details 例子：SQLite3 的连接配置 <Badge type="warning">不推荐</Badge>

Django 项目默认使用的数据库为 SQLite3，不需要额外安装下载

::: code-group

```py [settings.py]
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
```

```[项目目录]
[项目目录]
├─ manage.py
│
├─ db.sqlite3
│
└─ [主应用]/
    └─ ...
```

:::

::: details 例子：PostgreSQL 的连接配置

```zsh
% cd [项目名]
% source [虚拟环境]/bin/activate
(虚拟环境) % pip install psycopg2-binary               # [!code focus]
(虚拟环境) % pip show psycopg2-binary | grep Version
Version: 2.9.9
```

::: code-group

```py [主应用/settings.py]
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": "域名",
        "PORT": "端口号",
        "USER": "自定义用户名",
        "PASSWORD": "自定义用户密码",
        "NAME": "自定义数据库名",
    }
}
```

:::

---

### 缓存

```py
CACHES = {
    "default": {
        # 使用的缓存后端的类的路径
        # --------------------------------------------------------------------------------
        "BACKEND": "后端类",

        # 缓存服务器的连接地址
        # --------------------------------------------------------------------------------
        "LOCATION": "连接地址,

        "OPTIONS": {
            # 使用的客户端类
            # --------------------------------------------------------------------------------
            "CLIENT_CLASS": "客户端类",

            # 连接密码，若没有可省略
            # --------------------------------------------------------------------------------
            "PASSWORD": "",

            # 是否忽略缓存异常 ( 通常生产环境中定义为 True 来缓存不可用时造成系统崩溃 )
            # --------------------------------------------------------------------------------
            "IGNORE_EXCEPTIONS": 布尔值,
        },
    }
}
```

::: details 例子：Redis 配置

```zsh
% cd [项目名]
% source [虚拟环境]/bin/activate
(虚拟环境) % pip install redis                         # [!code focus:2]
(虚拟环境) % pip install django-redis
```

::: code-group

```py [主应用/settings.py]
import os

redis_host = os.environ.get('CUSTOM_REDIS_HOST', '127.0.0.1')
redis_port = os.environ.get('CUSTOM_REDIS_PORT', '6379')

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{redis_host}:{redis_port}",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "IGNORE_EXCEPTIONS": True,
        },
    }
}
```

:::

---

### 模版

```py
TEMPLATES = [
    {
        # 设定模版引擎
        # --------------------------------------------------------------------------------
        "BACKEND": "django.template.backends.django.DjangoTemplates",

        # 设定模版文件的查找路径
        # 模版文件重名查找优先级取决于定义顺序
        # --------------------------------------------------------------------------------
        "DIRS": [
            BASE_DIR / "templates",           # 项目根目录下的 templates 目录
            BASE_DIR / "自定义应用/templates",  # 自定义应用目录下的 templates 目录
        ],

        # 设定是否在自定义应用目录下查找模版文件
        # --------------------------------------------------------------------------------
        "APP_DIRS": True,

        # 模版上下文的相关配置
        # 无特殊需求不用修改
        # --------------------------------------------------------------------------------
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
```

---

### 中间件

```py
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",                # 内置中间件，提供安全机制用于保护通信安全
    "django.contrib.sessions.middleware.SessionMiddleware",         # 内置中间件，提供会话 Session 功能
    "django.middleware.common.CommonMiddleware",                    # 内置中间件，处理请求信息
    "django.middleware.csrf.CsrfViewMiddleware",                    # 内置中间件，提供 CSRF 防护
    "django.contrib.auth.middleware.AuthenticationMiddleware",      # 内置中间件，提供用户认证系统
    "django.contrib.messages.middleware.MessageMiddleware",         # 内置中间件，提供信息提示功能
    "django.middleware.clickjacking.XFrameOptionsMiddleware",       # 内置中间件，防止恶意程序单击劫持
    "第三方包提供的中间件",
    "自定义中间件",
]
```

---

### 国际化与本地化

```py
#【 管理页面的使用语言 】
# 可按需改为 zh-Hans、ja 等
# --------------------------------------------------------------------------------
LANGUAGE_CODE = 'en-us'


#【 服务器端使用的时区 】
# 可按需改为 Asia/Shanghai、Asia/Tokyo 等
# --------------------------------------------------------------------------------
TIME_ZONE = 'UTC'


#【 是否支持国际化 】
# --------------------------------------------------------------------------------
USE_I18N = True


#【 是否支持时区 】
# --------------------------------------------------------------------------------
USE_TZ = True
```

---

### 其他配置项

```py
#【 部署配置 】
# 无特殊需求不用修改
# --------------------------------------------------------------------------------
WSGI_APPLICATION = 'configs.wsgi.application'


#【 密码验证配置 】
# 无特殊需求不用修改
# --------------------------------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator' },
]
```
