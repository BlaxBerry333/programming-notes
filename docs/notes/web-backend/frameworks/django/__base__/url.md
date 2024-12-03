# Django 路由

> urls

Django 路由用于分发请求路径与 [视图 ( View )](./mtv/view.md) 之间的映射关系

## 所在位置

Django 的路由分为主路由、应用路由

- 主路由文件位于项目主应用目录下，在项目初始化时会自动创建
- 应用路由文件在新创建自定义应用时不会自动生成，需手动创建到应用目录中

::: code-group

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   ├─ urls.py      # 项目中所有的路由与视图的映射关系
│   └─ ...
│
└─ [自定义应用名]/
    ├─ ...
    └─ urls.py      # 该应用的相关路由与视图的映射关系  # [!code ++]
```

:::

## 路由的定义

### 基础路由

Django 项目的映射关系需要定义与主应用目录下的`urls.py`文件中

不建议全部定义到主路由，而建议分别定义到各个应用模块然后以 [嵌套路由](#嵌套路由) 的形式统合到主路由

::: code-group

```py [主应用/urls.py]
from django.contrib import admin
from django.urls import path

from 视图模块路径 import 视图函数, 视图类

urlpatterns = [
    # /admin/
    path('admin/', admin.site.urls),    # Django Admin 管理页面

    # /
    path('', 视图函数),
    path('', 视图类.as_view()),

    # /foo
    path('foo', 视图函数),
    path('foo', 视图类.as_view()),

    # /foo/
    path('foo/', 视图函数),
    path('foo/', 视图类.as_view()),
]
```

:::

---

### 命名路由

在定义路由映射关系时建议指定一个自定义名称

在视图、模板中可以通过 Django 内置函数`reverse()`利用取该路由映射关系的请求路径

::: code-group

```py [主应用/urls.py]
from django.urls import path

from 视图模块路径 import 视图函数, 视图类

urlpatterns = [
    path('请求路径', 视图函数, name="自定义路由名"),
    path('请求路径', 视图类.as_view(), name="自定义路由名"),
]
```

```py [视图]
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.views import View


class 视图类(View):
    def get(self, request):
        redirect_url = reverse('自定义路由名')          # [!code hl]
        return HttpResponseRedirect(redirect_url)


def 视图函数(request):
    redirect_url = reverse('自定义路由名')              # [!code hl]
    return HttpResponseRedirect(redirect_url)
```

```html [模版]
{% url '自定义路由名' %}
```

:::

---

### 嵌套路由

嵌套路由是指将路由映射关系分别定义于各个相关应用模块的目录中，然后在主路由中统合

创建自定义应用后不会自动生成该应用的相关路由，需手动创建一个`urls.py`文件

::: code-group

```py [主应用/urls.py]
from django.urls import path, include

urlpatterns = [
    path('请求路径/', include('自定义应用名1.urls')),
    path('请求路径/', include('自定义应用名2.urls')),
    path('请求路径/', include('自定义应用名3.urls')),
]
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   ├─ ...
│   └─ urls.py
│
├─ [自定义应用名1]/
│   ├─ ...
│   └─ urls.py
│
├─ [自定义应用名2]/
│   ├─ ...
│   └─ urls.py
│
└─ [自定义应用名3]/
    ├─ ...
    └─ urls.py
```

:::

## 路由参数

### 查询字符串

> Query String

不需要在路由中定义，只需要在发送请求时在请求路径结尾拼接传递

::: code-group

```http [请求路径]
/请求路径?参数=值
/请求路径?参数1=值&参数2=值
```

```py [路由]
from django.urls import path
from 视图模块路径 import 视图函数, 视图类

urlpatterns = [
    path('请求路径', 视图函数),
    path('请求路径', 视图类.as_view()),
]
```

:::

在视图中通过`请求对象.GET.get()`获取

::: code-group

```py [视图类]
from django.views import 内置视图类
from django.http import 内置响应对象类


class 自定义视图类(内置视图类):
    def 请求方式(self, 请求对象, *args, **kwargs):
        参数1 = request.GET.get("参数1")         # 若参数不存在则返回 None
        参数2 = request.GET.get("参数1", 默认值)  # 若参数不存在则返回默认值
        return 内置响应对象类(响应数据, status=状态码)
```

```py [视图函数]
from django.http import 内置响应对象类

def 视图函数(request):
    参数1 = request.GET.get("参数1")             # 若参数不存在则返回 None
    参数2 = request.GET.get("参数2", 默认值)      # 若参数不存在则返回默认值
    return 内置响应对象类(响应数据, status=状态码)
```

:::

::: details 例子：

::: code-group

```py [视图函数写法]
from django.contrib import admin
from django.urls import path
from django.http import HttpResponse


def foo(request):
    a = request.GET.get("a")
    b = request.GET.get("b")
    return HttpResponse(f"a: {a} b: {b}")


urlpatterns = [
    """
    /foo?a=xx
    /foo?b=123
    /foo?a=123&b=456
    """
    path("foo", foo, name="foo"),
]
```

:::

---

### 动态路由参数

> Dynamic Route Parameters

需要在定义路由时指明路径中含有的变量名，在发送请求时在参数位置传递对应的值

::: code-group

```http [请求路径]
/请求路径/<参数>/
/请求路径/<参数1>/<参数2>/
```

```py [路由]
from django.urls import path
from 视图模块路径 import 视图函数, 视图类

urlpatterns = [
    path('请求路径/<参数1>', ...),
    path('请求路径/<类型:参数1>/<类型:参数2>', ...),
]
```

:::

> [!IMPORTANT] 定义路由时可给参数指定类型
>
> - `slug` ( 可包含横线下划线的数字与字符串 )
> - `int`
> - `str` ( 默认 )
> - `path`( 可包含斜杠的字符串 )
> - `uuid` ( uuid 字符串 )
>
> ```py
> urlpatterns = [
>     path('test/<int:xxx>/', ...),
>     path('test/<slug:xxx>/', ...),
>     path('test/<path:xxx>/', ...),
>     path('test/<uuid:xxx>/', ...),
> ]
> ```

路径参数值会被作为关键字参数传递给视图类中的请求处理方法或对应的视图函数

::: code-group

```py [视图类]
from django.views import 内置视图类
from django.http import 内置响应对象类

class 自定义视图类(内置视图类):
    def 请求方式(self, 请求对象, 参数1, 参数2, *args, **kwargs):
        return 内置响应对象类(响应数据, status=状态码)

```

```py [视图函数]
from django.http import 内置响应对象类

def 视图函数(请求对象, 参数1, 参数2):
    return 内置响应对象类(响应数据, status=状态码)
```

:::

::: details 例子：

::: code-group

```py [视图函数]
from django.contrib import admin
from django.urls import path
from django.http import HttpResponse


def foo(request, a, b):
    return HttpResponse(f"a: {a} b: {b}")


urlpatterns = [
    """
    /foo/123/456
    /foo/xxx/456
    /foo/xxx-123/456
    /foo/xxx_123/456
    """
    path("foo/<slug:a>/<int:b>", foo, name="foo"),
]
```

:::

## 资源文件的访问

[更多详见](./project-settings.md#资源文件相关)

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

```py [主应用/settings.py]
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

MEDIA_URL = "media/"                # [!code ++:2]
MEDIA_ROOT = BASE_DIR / "media"
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   ├─ settings.py
│   └─ ...
│
├─ [自定义应用]/
│   └─ ...
│
└─ media/                       # [!code ++:6]
    ├─ [自定义路径]/
    │  ├─ [资源文件].[后缀]
    │  └─ ...
    ├─ [资源文件].[后缀]
    └─ ...
```

:::
