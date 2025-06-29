# DRF 视图集

> ViewSet

可快速实现请求响应处理、数据的 CRUD 操作 ( 比原生 Django 的视图更简洁 )

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
