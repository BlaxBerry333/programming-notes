---
prev: false
next: false
---

# Django REST Framework

![](/static/skill-images/web-backend--django-rest-framework.png)

> Django REST Framework ( DRF )

DRF 是一个 Django 的第三方应用，主要用于快速构建 Restful Web API

可以简化原生 Django 开发 API 时的 CRUD 操作、数据的序列化与反序列化

## 下载安装

```zsh
# 1. 在项目中创建并启用虚拟环境
% cd [项目名]
% python -m venv [虚拟环境]
% source [虚拟环境]/bin/activate

# 2. 在虚拟环境中下载安装 DRF 相关的包                      # [!code focus:4]
(虚拟环境) % pip install djangorestframework==3.15.2
(虚拟环境) % pip install markdown
(虚拟环境) % pip install django-filter
```

## 架构组成

::: code-group

```txt[DRF 架构组成]
                        Django Server + DRF
       ┌─────────────────────────────────────────────────────────┐
       │                     ┌────────────────────────────────┐  │
       │                     │           Application          │  │
Client │                     │                                │  │ Database
───────┼────▶ DRF Router ────┼───▶  ViewSet  ◀────▶  Model  ──┼──┼────────▶
       │                     │         │              ▲ ▲     │  │
       │                     │         ▼              │ │     │  │
◀──────┼────( JSON Data )────┼──── Serializer ◀───────┘ │     │  │
       │                     │                          │     │  │
       │                     └──────────────────────────┼─────┘  │
       │                                                |        │
       │                     ┌──────────────────────────▼─────┐  │
       │                     │           Django Admin         │  │
       │                     │        DRF Browsable API       │  │
       │                     └────────────────────────────────┘  │
       └─────────────────────────────────────────────────────────┘
```

```txt[原生 Django 架构组成]
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

## 路由

> Routers

DRF 的路由可以快速实现与 [视图集](#视图集) 的映射关系，比原生 Django 更简洁

::: code-group

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   ├─ urls.py
│   └─ ...
│
└─ [自定义应用名]/
    ├─ ...
    └─ urls.py      # [!code ++]
```

:::

---

### 创建

可以自动创建与视图集相关的所有 HTTP 请求的路由

```py
from django.urls import path, include
from rest_framework import routers
from .views import 自定义视图集类1, 自定义视图集类2

自定义路由器 = routers.DefaultRouter()

自定义路由器.register(
    prefix="路由前缀",
    viewset=自定义视图集类1,
    basename="路由反转时的别名",
)
自定义路由器.register(
    prefix="路由前缀",
    viewset=自定义视图集类2,
    basename="路由反转时的别名",
)

urlpatterns = [
    path("", include(自定义路由器.urls))
]
```

::: details 例子：一个简单的 DRF 路由

::: code-group

```py [urls.py]
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import StudentsViewSet

student_router = DefaultRouter()
student_router.register(
    prefix="students",
    viewset=StudentsViewSet,
    basename="students",
)

urlpatterns = [
    """"
    prefix="students" 定义的相关路由:

    GET     /student/       获取所有学生信息的列表
    POST    /student/       新增一个学生
    GET     /student/<id>/  获取一个学生的信息
    PATCH   /student/<id>/  更新一个学生的部分信息
    PUT     /student/<id>/  更新一个学生的所有信息
    DELETE  /student/<id>/  删除一个学生

    basename="students" 自动生成的用于路由反转时的别名:
    /students/      student-list
    /student/<id>/  student-detail
    """
    path("", include(student_router.urls))
]
```

:::

---

### 嵌套路由

嵌套路由可以使用第三方包 [drf-nested-routers](https://github.com/alanjds/drf-nested-routers)

## 序列化器

> Serializers

DRF 序列化器用于处理 Django 模型实例与 JSON 格式数据的相互转换，比原生 Django 更简洁

建议以模块化的形式组织定义在自定义应用目录下

::: code-group

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ [自定义应用名]/
    ├─ ...
    └─ serializers/               # [!code ++:6]
       ├─ __init__.py
       ├─ [序列化器1].py
       ├─ [序列化器2].py
       └─ ...
```

:::

---

### 创建

序列化器是个类，自定义序列化器类通常命名为`模型名Serializer`

序列化器会自动映射模型中的字段到响应数据，可通过`fields`或`exclude`属性选择具体的字段

```py
from rest_framework import serializers
from .models import 自定义模型类


class 自定义序列化器类(serializers.ModelSerializer):
    响应数据中的字段1 = serializers.字段类()
    响应数据中的字段2 = serializers.字段类()

    class Meta:
        model = 自定义模型类
        fields = ("模型类中的字段1", "模型类中的字段2")  # exclude 与 fields 二选一
        exclude = ("模型类中的字段1", "模型类中的字段2") # exclude 与 fields 二选一
        read_only_fields = ("模型类中的字段1", "模型类中的字段2")
```

::: details 例子：基于模型类创建一个简单的序列化器类

::: code-group

```py [serializers.py]
from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = ("id",)
```

```py [models.py]
from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=36, verbose_name="学生姓名", help_text="姓名")
    score = models.FloatField(verbose_name="学生分数", help_text="分数")
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "学生信息"
        verbose_name_plural = verbose_name
        ordering = ("score",)

    def __str__(self):
        return self.name
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ [应用名]
    ├─ admin.py
    ├─ views.py
    ├─ models.py
    ├─ serializers.py
    └─ ...
```

:::

---

### 序列化与反序列化

```py
# 获取数据库表中所有数据 ( 列表形式 )
# --------------------------------------------------------------------------------
模型类实例 = 模型类.objects.all()
序列化器类实例 = 序列化器类(instance=模型类实例, many=True)
数据 = 序列化器类实例.data


# 获取数据库表中指定数据 ( 字典形式 )
# --------------------------------------------------------------------------------
try:
    模型类实例 = 模型类.objects.get(字段=值)
except 模型类.DoesNotExist:
    # ...
else:
    序列化器类实例 = 序列化器类(模型类实例)
    数据 = 序列化器类实例.data


# 向数据库表中创建数据
# --------------------------------------------------------------------------------
数据 = {"字段1": 值, "字段2": 值}
序列化器类实例 = 序列化器类(data=数据)


# 更新数据库表中的数据
# --------------------------------------------------------------------------------
try:
    模型类实例 = 模型类.objects.get(字段=值)
except 模型类.DoesNotExist:
    # ...
else:
    数据 = {"字段1": 值, "字段2": 值}
    序列化器类实例 = 序列化器类(模型类实例, data=数据, partial=True)
    if 序列化器类实例.is_valid():
        序列化器类实例.save()


# 从数据库表中删除数据
# --------------------------------------------------------------------------------
try:
    模型类实例 = 模型类.objects.get(字段=值)
except 模型类.DoesNotExist:
    # ...
else:
    模型类实例.delete()
```

::: details 例子：( CBV + APIView ) 自定义 GET 请求返回所有数据与指定数据

::: code-group

```py [views.py]
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializers import StudentSerializer


class StudentListView(APIView):
    def get(self, requests):
        students = Student.objects.all()
        serializer = StudentSerializer(instance=students, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class StudentDetailView(APIView):
    def get(self, requests, **kwargs):
        try:
            student_id = kwargs.get("id")
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = StudentSerializer(student)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
```

```py [models.py]
from django.db import models
from django.conf import settings


class Student(models.Model):
    name = models.CharField(max_length=36, verbose_name="学生姓名", help_text="姓名")
    score = models.FloatField(verbose_name="学生分数", help_text="分数")
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "学生信息"
        verbose_name_plural = verbose_name
        ordering = ("score",)

    def __str__(self):
        return self.name
```

```py [serializers.py]
 from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ("name", "score", "updated_at")
```

```py [urls.py]
from django.urls import path
from .views import StudentListView, StudentDetailView

urlpatterns = [
    path("students", StudentListView.as_view(), name="students"),
    path("student/<int:id>", StudentDetailView.as_view(), name="student_detail"),
]
```

```zsh [请求命令]
% curl -X GET http://127.0.0.1:8000/students \
    -H "X-CSRFToken: 4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp" \
    -b "csrftoken=4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp; sessionid=yr0q1nngcevqcgigakgfnniip3lff3st"
# [{"name":"Andy","score":98.0,"updated_at":"2024-10-19T02:16:20+0000"}]

% curl -X GET http://127.0.0.1:8000/student/1 \
    -H "X-CSRFToken: 4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp" \
    -b "csrftoken=4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp; sessionid=yr0q1nngcevqcgigakgfnniip3lff3st"
# {"name":"Andy","score":98.0,"updated_at":"2024-10-19T02:16:20+0000"}
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ migrations/
    ├─ urls.py
    ├─ models.py
    ├─ serializers.py
    ├─ views.py
    └─ ...
```

:::

::: details 例子：( CBV + APIView ) 自定义 POST 请求创建数据

::: code-group

```py [views.py]
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Student
from .serializers import StudentSerializer


class CreateStudentView(APIView):
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

```py [models.py]
from django.db import models
from django.conf import settings


class Student(models.Model):
    name = models.CharField(max_length=36, verbose_name="学生姓名", help_text="姓名")
    score = models.FloatField(verbose_name="学生分数", help_text="分数")
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "学生信息"
        verbose_name_plural = verbose_name
        ordering = ("score",)

    def __str__(self):
        return self.name
```

```py [serializers.py]
 from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ("name", "score", "updated_at")
```

```py [urls.py]
from django.urls import path
from .views import CreateStudentView

urlpatterns = [
    path("student/create", CreateStudentView.as_view(), name="student_create"),
]
```

```zsh [请求命令]
% curl -X POST http://127.0.0.1:8000/student/create \
    -H "X-CSRFToken: 4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp" \
    -b "csrftoken=4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp; sessionid=yr0q1nngcevqcgigakgfnniip3lff3st" \
    -H "Content-Type: application/json" \
    -d '{"name":"Tom", "score":48 }'
# {"name":"Tom","score":48.0,"updated_at":"2024-10-19T06:27:25+0000"}

% curl -X POST http://127.0.0.1:8000/student/create \
    -H "X-CSRFToken: 4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp" \
    -b "csrftoken=4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp; sessionid=yr0q1nngcevqcgigakgfnniip3lff3st" \
    -H "Content-Type: application/json" \
    -d '{"name":"Amy"}'
# {"score":["This field is required."]}
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ migrations/
    ├─ urls.py
    ├─ models.py
    ├─ serializers.py
    ├─ views.py
    └─ ...
```

:::

::: details 例子：( CBV + APIView ) 自定义 PATCH 请求更新部分数据

::: code-group

```py [views.py]
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Student
from .serializers import StudentSerializer


class StudentView(APIView):
    def patch(self, request, **kwargs):
        try:
            student_id = kwargs.get("id")
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = StudentSerializer(student, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

```py [models.py]
from django.db import models
from django.conf import settings


class Student(models.Model):
    name = models.CharField(max_length=36, verbose_name="学生姓名", help_text="姓名")
    score = models.FloatField(verbose_name="学生分数", help_text="分数")
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "学生信息"
        verbose_name_plural = verbose_name
        ordering = ("score",)

    def __str__(self):
        return self.name
```

```py [serializers.py]
 from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ("name", "score", "updated_at")
```

```py [urls.py]
from django.urls import path
from .views import StudentView

urlpatterns = [
    path("student/<int:id>", StudentView.as_view(), name="student_detail"),
]
```

```zsh [请求命令]
% curl -X PATCH http://127.0.0.1:8000/student/7 \
    -H "X-CSRFToken: 4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp" \
    -b "csrftoken=4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp; sessionid=yr0q1nngcevqcgigakgfnniip3lff3st" \
    -H "Content-Type: application/json" \
    -d '{"name":"Tom", "score":68 }'
# {"name":"Tom","score":68.0,"updated_at":"2024-10-19T06:27:25+0000"}
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ migrations/
    ├─ urls.py
    ├─ models.py
    ├─ serializers.py
    ├─ views.py
    └─ ...
```

:::

::: details 例子：( CBV + APIView ) 自定义 DELETE 请求删除数据

::: code-group

```py [views.py]
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Student
from .serializers import StudentSerializer


class StudentView(APIView):
    def delete(self, requests, **kwargs):
        try:
            student_id = kwargs.get("id")
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            student.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
```

```py [models.py]
from django.db import models
from django.conf import settings


class Student(models.Model):
    name = models.CharField(max_length=36, verbose_name="学生姓名", help_text="姓名")
    score = models.FloatField(verbose_name="学生分数", help_text="分数")
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "学生信息"
        verbose_name_plural = verbose_name
        ordering = ("score",)

    def __str__(self):
        return self.name
```

```py [serializers.py]
 from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ("name", "score", "updated_at")
```

```py [urls.py]
from django.urls import path
from .views import StudentView

urlpatterns = [
    path("student/<int:id>", StudentView.as_view(), name="student_detail"),
]
```

```zsh [请求命令]
% curl -X DELETE http://127.0.0.1:8000/student/7 \
    -H "X-CSRFToken: 4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp" \
    -b "csrftoken=4lxzaMWFWm3BxKhcpOnNZKyWiptOJQGp; sessionid=yr0q1nngcevqcgigakgfnniip3lff3st"
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ migrations/
    ├─ urls.py
    ├─ models.py
    ├─ serializers.py
    ├─ views.py
    └─ ...
```

:::

## 视图集

> Viewsets

DRF 的视图集可快速实现请求响应处理以及数据的 CRUD 操作，比原生 Django 的视图更简洁

建议定义在自定义应用目录下替代原生 Django 的视图

::: code-group

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ [自定义应用名]/
    ├─ ...
    └─ views/               # [!code ++:6]
       ├─ __init__.py
       ├─ [视图集1].py
       ├─ [视图集2].py
       └─ ...
```

:::

---

### 创建

视图集是个类，自定义视图集类通常命名为`模型名ViewSet`

自定义视图集类需要从`viewsets`中继承所需的内置视图集类

内置视图集类也继承有不同的 [内置视图类](#内置视图类) 并提供指定 HTTP 请求的处理方法

```py
from rest_framework import viewsets
from .models import 自定义模型类
from .serializers import 自定义序列化器类


class 自定义视图集类(viewsets.内置视图集类):
    queryset = 自定义模型类.objects.all()
    serializer_class = 自定义序列化器类
```

| 常用内置视图集类       | 继承的内置视图类                                                                                                                                                            | 说明                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `ViewSet`              | `APIView`                                                                                                                                                                   | 仅作为视图基类不提供请 CRUD 操作 |
| `ReadOnlyModelViewSet` | `GenericAPIView`                                                                                                                                                            | 仅提供可读的 GET 请求处理        |
| `ModelViewSet`         | `GenericViewSet`<br/>`mixins.CreateModelMixin`<br/> `mixins.RetrieveModelMixin`<br/> `mixins.UpdateModelMixin`<br/> `mixins.DestroyModelMixin`<br/> `mixins.ListModelMixin` | 提供了基于模型的完整 CRUD 操作   |

---

### 重写请求处理

可通过重写覆盖继承自内置视图集类的方法，来实现自定义请求处理方法的逻辑

```py
from rest_framework import viewsets
from .models import 自定义模型类
from .serializers import 自定义序列化器类


class 自定义视图集类(viewsets.内置视图集类):
    queryset = 自定义模型类.objects.all()
    serializer_class = 自定义序列化器类

    # 重写覆盖 GET 请求列表
    # --------------------------------------------------------------------------------
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return response

    # 重写覆盖 GET 请求单个资源
    # --------------------------------------------------------------------------------
    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return response

    # 重写覆盖 POST 请求创建资源
    # --------------------------------------------------------------------------------
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return response

    # 重写覆盖 PUT 请求更新资源
    # --------------------------------------------------------------------------------
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response

    # 重写覆盖 PATCH 请求部分更新
    # --------------------------------------------------------------------------------
    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        return response

    # 重写覆盖 DELETE 请求删除资源
    # --------------------------------------------------------------------------------
    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return response
```

---

### 内置视图类

DRF 提供了很多内置视图类来简化原生 Django 视图中的对 HTTP 请求的处理

创建视图时一般需要直接继承使用 [内置视图集](#视图集)

因为内置视图集已经继承了内置视图类没有必要额外单独使用内置视图类

| 常见内置视图类             | 说明                                      |
| -------------------------- | ----------------------------------------- |
| `views.APIView`            | DRF 的基础类，接近原生 Django 的 View     |
| `generics.ListAPIView`     | 提供一个请求列表的 GET 请求的处理方法     |
| `generics.RetrieveAPIView` | 提供一个请求单个资源的 GET 请求的处理方法 |
| `generics.CreateAPIView`   | 提供一个创建资源的 POST 请求的处理方法    |
| `generics.UpdateAPIView`   | 提供一个更新资源的 PUT 请求的处理方法     |
| `generics.DestroyAPIView`  | 提供一个删除资源的 DELETE 请求的处理方法  |

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
