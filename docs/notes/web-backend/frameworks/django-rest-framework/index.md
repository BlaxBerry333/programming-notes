---
prev: false
next: false
---

# Django REST Framework

![](/static/skill-images/web-backend--django-rest-framework.png)

> Django REST Framework ( DRF )

DRF 是一个 Django 的第三方应用，主要用于快速构建 Restful API 服务器

在原生 Django 提供更加简洁的 CRUD 实现、数据序列化反序列化、权限、认证等功能

## 下载安装

```zsh
# 1. 在项目中创建并启用虚拟环境
% cd [项目名]
% python -m venv [虚拟环境]
% source [虚拟环境]/bin/activate

# 2. 在虚拟环境中下载安装 Django
(虚拟环境) % pip install Django==4.2.16

# 3. 在虚拟环境中下载安装 DRF 相关的包                      # [!code focus:4]
(虚拟环境) % pip install djangorestframework==3.15.2
(虚拟环境) % pip install markdown
(虚拟环境) % pip install django-filter
```

## 架构组成

::: code-group

```txt[DRF + Django]
                                      Client
┏━━ DRF + Djang ━━━━━━━━━━━━━━━━━━━━━━━━▼━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                      URL                      ┃
┃                    ┏━━━━━━━━━━━━━━━━━━▼━━━━ Application ━┓    ┃
┃                    ┃                Router               ┃    ┃
┃                    ┃                  ▼                  ┃    ┃
┃  ┏━━━━━━━━━━━━━━┓  ┃               ViewSets              ┃    ┃
┃  ┃ Django Admin ┃  ┃                  ▼                  ┃    ┃
┃  ┣━━━━━━━━━━━━━━╋━━╋━━━━━━━━━━━━━━━ Models               ┃    ┃
┃  ┃ BrowsableAPI ┃  ┃                  ▼                  ┃    ┃
┃  ┗━━━━━━┳━━━━━━━┛  ┃              Serializers            ┃    ┃
┃         ┃          ┃                  ▼                  ┃    ┃
┃         ┃          ┗━━━━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━━━━┛    ┃
┗━━━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━▼━━━━━━━━━━━━━━━━━━━━━━━┛
          ┗━━━━━━━━━━━━━━━━━━━━━━━▶  Database
```

```txt[原生 Django]
                                      Client
┏━━ Djang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━▼━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                      URL                      ┃
┃                    ┏━━━━━━━━━━━━━━━━━━▼━━━━ Application ━┓    ┃
┃                    ┃               Sub URL               ┃    ┃
┃                    ┃                  ▼                  ┃    ┃
┃                    ┃                Views                ┃    ┃
┃                    ┃       ┏━━━━━━━━━━┻━━━━━━━━━━┓       ┃    ┃
┃  ┏━━━━━━━━━━━━━━┓  ┃       ▼                     ▼       ┃    ┃
┃  ┃ Django Admin ┣━━╋━━━━ Models ━━━━━━━━━━━▶ Templates ▶ ▶ ▶ ▶ ▶
┃  ┗━━━━━━┳━━━━━━━┛  ┃       ▲                             ┃    ┃
┃         ┃          ┗━━━━━━━╋━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛    ┃
┗━━━━━━━━━╋━━━━━━━━━━━━━━━━━━▼━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
          ┗━━━━━━━━━━━━▶  Database
```

:::

|                | 原生 Django             | Django REST Framework                |
| -------------- | ----------------------- | ------------------------------------ |
| 路由           | 手写 URL                | [Router](#路由)                      |
| 视图           | Views                   | [ViewSets](#视图集)                  |
| 模型           | Models                  | Models                               |
| 数据序列化     | 在视图中直接操作 Models | [Serializers](#序列化器) 操作 Models |
| 测试与管理界面 | Django Admin            | Django Admin + Browsable API         |

## 前提配置

::: code-group

```py [主应用/settings.py]
INSTALLED_APPS = [
    # ...
    "rest_framework",                                                                    # [!code ++:2]
    "rest_framework.authtoken",
]

REST_FRAMEWORK = {                                                                       # [!code ++:33]
    # 分页配置
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 100,

    # 日期时间格式
    "DATETIME_FORMAT": "%Y-%m-%dT%H:%M:%S%z",

    # 解析器
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ],

    # 渲染器
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],

    # 权限控制
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],

    # 认证方式
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
}
```

```py [主应用/urls.py]
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),  # [!code ++]
]
```

:::




<!-- ## 认证

> Authentication

DRF 提供了三个内置认证类来实现三种验证方式

|     DRF 内置认证类      | 说明                                                                                  |
| :---------------------: | ------------------------------------------------------------------------------------- |
|  `BasicAuthentication`  | 最基础的户名和密码进行认证 ( 不建议用于生产环境 )                                     |
| `SessionAuthentication` | Django 默认的 Session 认证<br/>调用非 GET 请求接口时需要传递 csrftoken 令牌           |
|  `TokenAuthentication`  | Token 令牌进行认证<br/>使用前提需要配置文件注册第三方应用`"rest_framework.authtoken"` |

::: code-group

```py [主应用/settings.py]
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [                          # [!code ++:3]
        # DRF 内置认证类
    ],
}
```

:::

---

### Token 验证

通过 DRF 的内置认证类`TokenAuthentication`实现

使用前还需要在 Django 配置文件的`INSTALLED_APPS`中注册`"rest_framework.authtoken"`

::: code-group

```py [主应用/settings.py]
INSTALLED_APPS = [
    # ...
    "rest_framework",
    "rest_framework.authtoken",             # DRF 的 Token 认证      # [!code ++]
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",        # [!code ++]
    ],
}
```

:::

## 权限

> Permissions -->
