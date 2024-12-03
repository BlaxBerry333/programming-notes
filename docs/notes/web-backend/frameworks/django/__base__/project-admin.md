# Django 后台管理系统

Django 默认提供了一个后台管理系统的应用模块

可用于对各个自定义应用中 [模型 ( Model )](./mtv-model.md) 对应的数据进行可视化管理

## 前提配置

### 注册应用

::: details 1. 已经默认将管理系统注册到了主应用

Django 默认已经注册并使用了该内置管理系统

::: code-group

```py [主应用/settings.py]
INSTALLED_APPS = [                                             # [!code focus:8]
    # Django 内置应用
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # 其他第三方包
    # ...
    # 其他自定义应用
    # ...
]                                                              # [!code focus]
```

:::

::: details 2. 已经默认在主应用路由中定义了访问路径`/admin`与管理页面的映射关系

::: code-group

```py [主应用/urls.py]
from django.contrib import admin                    # [!code focus:5]
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    # 其他自定义的路由映射
    # ...
]                                                   # [!code focus]
```

:::

::: details 3. 只需要在启动 Django 项目之前将默认生成的迁移内容映射到数据库

主要是将 Django 内置模块`admin`、`auth`、`contenttypes`、`sessions`进行数据迁移

```zsh
(虚拟环境) % cd [项目名]                                           # [!code focus:2]
(虚拟环境) % python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying auth.0012_alter_user_first_name_max_length... OK
  Applying sessions.0001_initial... OK
```

:::

---

### 管理员用户

管理系统需要通过一个超级管理员用户登陆

创建的管理用户会存储在数据库中的`auth_user`表中

::: code-group

```zsh [方法一：交互式]
(虚拟环境) % cd [项目名]
(虚拟环境) % python manage.py createsuperuser
Username:           [输入用户登录名]
Email address:      [输入用户邮箱地址]
Password:           [输入用户登录密码]
Password (again):   [输入用户登录密码]
Superuser created successfully.
```

```zsh [方法二：脚本形式]
(虚拟环境) % cd [项目名]
(虚拟环境) % export DJANGO_SUPERUSER_USERNAME=[用户登录名]
(虚拟环境) % export DJANGO_SUPERUSER_EMAIL=[用户邮箱地址]
(虚拟环境) % export DJANGO_SUPERUSER_PASSWORD=[用户登录密码]
(虚拟环境) % python manage.py createsuperuser --noinput
```

:::

::: details 例子：用交互式创建一个管理用户

```zsh
(虚拟环境) % python manage.py createsuperuser
Username: admin
Email address: admin@example.com
Password: admin
Password (again): admin
The password is too similar to the username.
This password is too short. It must contain at least 8 characters.
This password is too common.
Bypass password validation and create user anyway? [y/N]: y
Superuser created successfully.
```

:::

::: details 例子：用脚本形式在 Docker Compose 中执行构建的容器时同时创建一个管理用户

::: code-group

```yml [docker-compose.yml]
version: "3.8"

services:
  backend:
    image: backend:latest
    container_name: backend
    build:
      context: ./backend
      dockerfile: Dockerfile
    command: sh -c "                                        # [!code hl:8]
      python manage.py migrate &&
      export DJANGO_SUPERUSER_USERNAME=admin &&
      export DJANGO_SUPERUSER_EMAIL=admin@example.com &&
      export DJANGO_SUPERUSER_PASSWORD=admin &&
      python manage.py createsuperuser --noinput &&
      python manage.py runserver 0.0.0.0:8080
      "
    ports:
      - "8080:8080"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: db:latest
    container_name: db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: my_db
    volumes:
      - my_db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d my_db"]
      interval: 5s
      timeout: 5s
      retries: 5
```

```[目录结构]
[项目目录]
├─ docker-compose.yml
│
└─ backend/
    ├─ Dockerfile
    └─ ...
```

::::

## 注册模型

模型必须要提前注册到该应用目录下`admin.py`文件后才能在后台管理系统上进行可视化管理

并且要提前做好数据迁移将内容映射到数据库，否则管理页面会报错

---

### 所处位置

::: code-group

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ [自定义应用]/
    ├─ admin.py       # [!code hl]
    └─ ...
```

:::

---

### 基础注册

模型类可通过方法`admin.site.register()`注册

::: code-group

```py [应用名/admin.py]
from django.contrib import admin
from .models import 模型类1, 模型类2     # [!code ++:4]

admin.site.register(模型类1)
admin.site.register(模型类2)
```

:::

::: details 例子：将自定义应用中的两个模型注册到 Django Admin

::: code-group

```py [xxxx/admin.py]
from django.contrib import admin
from .models import Student, StudySubject

admin.site.register(Student)
admin.site.register(StudySubject)
```

```py [xxxx/models.py]
from django.db import models


class Student(models.Model):
    # 省略 ...
    pass


class StudySubject(models.Model):
    # 省略 ...
    pass
```

```[目录结构]
demo_1
├─ manage.py
├─ ...
│
└─ xxxx/
    ├─ admin.py
    ├─ models.py
    └─ ...
```

::::

---

### 自定义注册

模型类可以一个类的形式注册，并进行额外的自定义配置

::: code-group

```py [应用名/admin.py]
from django.contrib import admin
from .models import 模型类1, 模型类2            # [!code ++:12]


@admin.register(模型类1)
class 模型名Admin(admin.ModelAdmin):
    pass


@admin.register(模型类2)
class 模型名Admin(admin.ModelAdmin):
    配置属性 = 值
    配置属性 = 值
```

:::

|  常用的配置属性   | 说明                                                                                       |
| :---------------: | ------------------------------------------------------------------------------------------ |
|  `list_display`   | 设置模型数据一览页面上可显示的模型字段<br/>比如：`list_display = ("字段名1", "字段名2")`   |
|  `list_per_page`  | 设置模型数据一览页面上每页展示的数据个数<br/>比如：`list_per_page = 10`                    |
|   `list_filter`   | 设置模型数据一览页面上的可过滤字段<br/>比如：`list_filter = ("字段名1", "字段名2")`        |
|    `ordering`     | 设置模型数据一览页面上的数据排序<br/>比如：`ordering = ("字段名1", "-字段名2")`            |
|  `search_fields`  | 设置模型数据一览页面上的可搜索的模型字段<br/>比如：`list_display = ("字段名1", "字段名2")` |
| `readonly_fields` | 设置模型数据编辑页面上的只读字段<br/>比如：`readonly_fields = ("字段名1", "字段名2")`      |

::: details 例子：将自定义应用中的一个模型注册到 Django Admin

::: code-group

```py [student/admin.py]
from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "score", "updated_at", "teacher")
    list_filter = ("name", "score")
    search_fields = list_display
    ordering = ("-score",)
    readonly_fields = ("updated_at",)
```

```py [student/models.py]
from django.db import models
from django.conf import settings


class Student(models.Model):
    name = models.CharField( verbose_name="学生姓名", max_length=36)
    score = models.FloatField(verbose_name="学生分数")
    updated_at = models.DateTimeField(verbose_name="更新时间", auto_now=True)
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null = True,
        verbose_name="担当老师",
    )

    class Meta:
        verbose_name = "学生信息"
        verbose_name_plural = verbose_name
        ordering = ("score",)

    def __str__(self):
        return f"{self.id}"
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ admin.py
    ├─ models.py
    └─ ...
```

:::

## 数据的导入导出

需要借助第三方库 [django-import-export](https://django-import-export.readthedocs.io/en/latest/)

```zsh
% cd [项目名]
% source [虚拟环境]/bin/activate
(虚拟环境) % pip install django-import-export          # [!code focus:1]
```

https://note.com/shinya_hd/n/n1f742973a81c
