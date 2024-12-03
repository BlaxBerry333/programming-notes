# Django 视图

> Views

Django 视图用于处理路由映射的 HTTP 请求与响应逻辑

可理解为 API 处理器，还可通过 [模型 ( Model )](./model.md) 实现对数据库的 CRUD 操作

## 所处位置

创建自定义应用后会自动在其目录内生成一个用于定义视图的`view.py`文件

建议以模块化的形式组织，不建议将当前应用的所有视图全部定义在这一个文件里

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
    ├─ views.py             # [!code --]
    └─ views/               # [!code ++:6]
       ├─ __init__.py
       ├─ [视图1].py
       ├─ [视图2].py
       └─ ...
```

:::

## 视图类

> Class Based View ( CBV )

---

### 创建

> [!IMPORTANT] 建议通过 Django REST Framework ( DRF )
>
> [更多详见](/notes/web-backend/frameworks/django/__extensions__/django-rest-framework.md)

```py
from django.views import 内置视图类
from django.http import 内置响应对象类


class 自定义视图类(内置视图类):
    def 请求方式(self, 请求对象, *args, **kwargs):
        # ...
        return 内置响应对象类(响应数据, status=状态码)
```

---

### 请求方式

视图类中通过重写内置视图类的方法的形式来处理不同的 HTTP 请求

```py
from django.views import 内置视图类
from django.http import 内置响应对象类


class 自定义视图类(内置视图类):

    # 处理 GET 请求
    def get(self, 请求对象, *args, **kwargs):
        return 内置响应对象类(响应数据, status=状态码)

    # 处理 POST 请求
    def post(self, 请求对象, *args, **kwargs):
        return 内置响应对象类(响应数据, status=状态码)

    # 处理 PATCH 请求
    def patch(self, 请求对象, *args, **kwargs):
        return 内置响应对象类(响应数据, status=状态码)

    # 处理 PUT 请求
    def put(self, 请求对象, *args, **kwargs):
        return 内置响应对象类(响应数据, status=状态码)

    # 处理 DELETE 请求
    def delete(self, 请求对象, *args, **kwargs):
        return 内置响应对象类(响应数据, status=状态码)
```

---

### 请求参数

处理请求的方法的第二个参数为请求对象 ( 一般约定命名为`request` ) 可从中获取请求参数

```py
import json
from django.views import 内置视图类
from django.http import 内置响应对象类


class 自定义视图类(内置视图类):
    def 请求方式(self, 请求对象, *args, **kwargs):

        # 请求体参数
        try:
            请求体 = json.loads(请求对象.body)
            参数1 = 请求体.get("参数1")
            参数2 = 请求体.get("参数2", 默认值)
        except json.JSONDecodeError:
            return JsonResponse({"error": "无效的 JSON 数据"}, status=400)

        # 查询参数
        参数1 = 请求对象.GET.get("参数1")
        参数2 = 请求对象.GET.get("参数1", 默认值)

        return 内置响应对象类(响应数据, status=状态码)

```

## 视图函数 <Badge type="warning">不推荐</Badge>

> Function Based View ( FBV )

建议使用视图类 ( CBV ) 定义视图

---

### 创建

> [!IMPORTANT] 建议通过 Django REST Framework ( DRF )
>
> [更多详见](/notes/web-backend/frameworks/django/__extensions__/django-rest-framework.md)

```py
from django.http import 内置响应对象类


def 视图函数(请求对象):
    if 请求对象.method == "请求方式":
        # ...
        return 内置响应对象类(响应数据, status=状态码)

    else:
        # ...
        return JsonResponse({"error": "Method not allowed"}, status=405)
```

---

### 请求方式

视图函数中通过判断请求方式来处理不同的 HTTP 请求

```py
from django.http import 内置响应对象类


def 视图函数(请求对象):

    # 处理 GET 请求
    if 请求对象.method == "GET":
        return 内置响应对象类(响应数据, status=状态码)

    # 处理 POST 请求
    if 请求对象.method == "POST":
        return 内置响应对象类(响应数据, status=状态码)

    # 处理 PATCH 请求
    if 请求对象.method == "PATCH":
        return 内置响应对象类(响应数据, status=状态码)

    # 处理 PUT 请求
    if 请求对象.method == "PUT":
        return 内置响应对象类(响应数据, status=状态码)

    # 处理 DELETE 请求
    if 请求对象.method == "DELETE":
        return 内置响应对象类(响应数据, status=状态码)

    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)
```
