# DRF 路由器

> Router

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
