# Django 模型

> Models

Django 模型位于 [视图 ( View )](./view.md) 与数据库之间，用于定义映射到数据库表中的数据结构

通过模型还可在视图中实现对数据库中数据的 CRUD 操作

## 所处位置

创建自定义应用后会自动在其目录内生成一个用于定义模型的`models.py`文件

建议以模块化的形式组织，不建议将当前应用的所有模型全部定义在这一个文件里

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
    ├─ models.py             # [!code --]
    └─ models/               # [!code ++:6]
       ├─ __init__.py
       ├─ [模型1].py
       ├─ [模型2].py
       └─ ...
```

:::

## 模型的定义

Django 模型实质为一个类

- 每个模型类会被映射为数据库中的一个表
- 模型的实例会被映射为数据库表中每行的数据
- 当类中属性的值为 [内置模型的字段类](#模型的字段) 的实例时，该属性会被映射为数据库表中每列的字段

---

### 基础模型类

```py
from django.db import models                # [!code focus:9]


class 模型类(models.Model):
    字段 = models.字段类(参数=值, 参数=值)
    字段 = models.字段类(参数=值, 参数=值)

    def __str__(self):
        return "模型实例在 Admin 管理页面上展示的文本"

    # 其他类中成员
```

---

### Meta 子类

模型类中可通过`Meta`子类来定义其元数据 ( metadata )

可通过向其中追加配置属性来自定义该模型在数据库以及 Django Admin 上的展示内容与行为

```py
from django.db import models


class 模型类(models.Model):
    字段1 = models.字段类(参数=值, 参数=值)
    字段2 = models.字段类(参数=值, 参数=值)

    class Meta:
        配置属性 = 值
        配置属性 = 值
```

| 常用的 Meta 类的配置属性 | 说明                                                                                    |
| :----------------------: | --------------------------------------------------------------------------------------- |
|        `db_table`        | 设置该模型映射在数据库中的表名<br/>默认为模型类名的 snake_case 小写形式                 |
|        `ordering`        | 设置该模型数据的默认排序方式<br/>值需要为一个包含字段名列表 ( 可使用`-字段名`表示降序 ) |
|      `verbose_name`      | 设置该模型在 Django Admin 上展示的单数的可名称文本                                      |
|  `verbose_name_plural`   | 设置该模型在 Django Admin 上展示的复数的可名称文本                                      |
|    `unique_together`     | 设置该模型中一组字段的组合必须唯一                                                      |
|  `default_permissions`   | 设置该模型的默认权限集<br/>默认值为`('add', 'change', 'delete', 'view')`                |
|        `abstract`        | 设置该模型是否为一个可复用的 [抽象模型类](#抽象模型类)<br/>默认值为`False`              |

::: details 例子：利用`Meta`子类为一个模型类设置基础的元数据

```py
from django.db import models


class StudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)
    score = models.FloatField(verbose_name="分数")
    created_at = models.DateTimeField(verbose_name="注册时间", auto_now_add=True)

    class Meta:
        db_table = "student"
        ordering = ["-score", "-name"]
        verbose_name =  "学生"
        verbose_name_plural = "学生列表"
```

:::

---

### 抽象模型类

模型类可通过其`Meta`子类的`abstract`属性将自己设置为一个抽象类，来实现模型的复用

抽象模型类不会在 [数据迁移](#数据迁移) 时被映射到数据库，其中的字段与方法仅供其他模型类继承

模型类可以继承多个抽象模型类，并可以按需重写公共字段与方法

```py
from django.db import models


class 抽象模型类1(models.Model):
    公共字段 = models.字段类(参数=值, 参数=值)
    公共字段 = models.字段类(参数=值, 参数=值)

    class Meta:
        abstract = True


class 抽象模型类2(models.Model):
    # 公共的类成员
    # 公共的类成员

    class Meta:
        abstract = True


class 模型类(抽象模型类1, 抽象模型类2):
    自己的字段 = models.字段类(参数=值, 参数=值)
    公共字段 = models.字段类(参数=值, 参数=值)      # 重写继承的抽象模型类中的公共字段
```

::: details 例子：定义一个抽象模型类共两个模型继承使用

```py
from django.db import models


class BaseStudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)
    score = models.FloatField(verbose_name="分数")
    created_at = models.DateTimeField(verbose_name="注册时间", auto_now_add=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.name}"


# 普通学生
class NormalStudentModel(BaseStudentModel):
    attendance_rate = models.FloatField(verbose_name="出勤率", default=0.0)


# 优秀学生
class TopStudentModel(BaseStudentModel):
    scholarship_amount = models.FloatField(verbose_name="奖学金金额", default=0.0)

    def get_scholarship_info(self):
        """返回奖学金信息"""
        return f"获得的奖学金金额为: {self.scholarship_amount}"
```

:::

## 模型的字段

模型的字段实质为类中属性，该属性的值为 Django 内置模型字段类的实例对象

- 模型的字段会被映射为数据库表中每列的字段
- 调用字段类时可通过其参数规定该字段的数据类型与约束

---

### 基础字段类

| 常用模型字段类  | 说明                                                                                |
| :-------------: | ----------------------------------------------------------------------------------- |
| `BigAutoField`  | 自增 ID 类型，默认用于模型的主键字段<br/>可省略，模型类默认为`id`属性使用了该字段类 |
|   `CharField`   | 字符串类型 ( 内容长度不能超过`255`个字符 )<br/>必须指定参数`max_length`             |
|   `TextField`   | 字符串类型 ( 内容为支持换行符的长文本 )                                             |
|  `EmailField`   | 字符串类型 ( 内容为邮箱地址，内置验证 )                                             |
|   `URLField`    | 字符串类型 ( 内容为 URL 地址，内置验证 )                                            |
| `IntegerField`  | 整数类型                                                                            |
|  `FloatField`   | 浮点数类型                                                                          |
| `BooleanField`  | 布尔值类型                                                                          |
| `DateTimeField` | 日期时间类型                                                                        |

> [!IMPORTANT] 常用的字段类通用参数
>
> |    常用参数    | 说明                                                                                                               |
> | :------------: | ------------------------------------------------------------------------------------------------------------------ |
> | `primary_key`  | 该字段是否设为表的主键<br/>除`BigAutoField`字段类以外其他都默认为`False`                                           |
> |    `unique`    | 该字段的值是否在表中保持唯一                                                                                       |
> |  `db_column`   | 该字段在数据库表中的自定义字段名                                                                                   |
> |   `default`    | 该字段在表中的默认值                                                                                               |
> |    `blank`     | 该字段在表中是否可以留空                                                                                           |
> |     `null`     | 该字段在表中是否可为`Null`                                                                                         |
> |  `max_length`  | 该字段的长度<br/>仅用于`CharField`、`TextField`字段类                                                              |
> |   `choices`    | 自定义字段值的选项 ( 列表嵌套元组的形式 )<br/>仅用于`CharField`、`TextField`、`IntegerField`、`BooleanField`字段类 |
> | `auto_now_add` | 仅在模型实例创建时自动为该字段设置时间<br/>仅用于`DateTimeField`字段类                                             |
> |   `auto_now`   | 在模型实例每次更新时自动为该字段设置时间<br/>仅用于`DateTimeField`字段类                                           |
> | `verbose_name` | 该字段在 Django Admin 上展示的名称文本                                                                             |
> |  `help_text`   | 该字段在 Django Admin 的编辑表单上的提示信息文本                                                                   |
> |   `editable`   | 该字段在 Django Admin 的编辑表单中是否可显示                                                                       |

::: details 例子：使用基础字段类定义一个模型类并通过参数约束字段的值

```py
from django.db import models


class StudentModel(models.Model):
    # id = models.BigAutoField(primary_key=True)

    name = models.CharField(
        verbose_name="姓名",
        max_length=50,
    )

    email = models.EmailField(
        verbose_name="邮箱",
        unique=True,
    )

    gender = models.IntegerField(
        verbose_name="性别",
        default=2,
        choices=[(1, "女"), (2, "男")],
    )

    score = models.FloatField(
        verbose_name="分数",
    )

    teacher_review = models.TextField(
        verbose_name="教师评语",
        blank=True,
    )

    is_top_student = models.BooleanField(
        verbose_name="是否为优等生",
        default=False,
    )

    created_at = models.DateTimeField(
        verbose_name="注册时间",
        auto_now_add=True,
        editable=False,
    )

    updated_at = models.DateTimeField(
        verbose_name="更新时间",
        auto_now=True,
        editable=False,
    )

    def __str__(self):
        return f"{self.id}"
```

:::

---

### 关联模型的字段类

不同模型间的关联 ( 数据库表的关联 ) 可以通过下面几个特殊字段类实现：

|  常用模型字段类   | 适用关系 | 说明                                                                                            |
| :---------------: | -------- | ----------------------------------------------------------------------------------------------- |
|   `ForeignKey`    | 一对多   | 每个 A 模型的实例可以关联多个 B 模型的实例<br/>但是每个 B 模型的实例只能关联一个 A 模型的实例   |
|  `OneToOneField`  | 一对一   | 每个 A 模型的实例只能关联一个 B 模型的实例                                                      |
| `ManyToManyField` | 多对多   | 每个 A 模型的实例可以关联多个 B 模型的实例<br/>同时每个 B 模型的实例也可以关联多个 A 模型的实例 |

> 如下：通过`"学生"`、`"小组"`、`"班级"`、`"个人信息"`简单说明模型间关联字段类的使用场景

::: code-group

```py [ForeignKey]
"""
每一个班级可以有多个学生，但是每一个学生只能属于一个班级
"""
from django.db import models


# 学生
class StudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)

    class_name = models.ForeignKey(
        "classModel",
        on_delete=models.CASCADE,
        related_name="student_class",
        verbose_name="班级名",
        null=True,
    )


# 班级
class ClassModel(models.Model):
    name = models.CharField( verbose_name="班级名", max_length=50)
```

```py [OneToOneField]
"""
每个学生都有自己唯一的个人信息
"""
from django.db import models


# 学生
class StudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)


# 个人简介
class ProfileModel(models.Model):
    description = models.TextField(verbose_name="简介", blank=True)

    student = models.OneToOneField(
        "StudentModel",
        on_delete=models.CASCADE,
        verbose_name="学生",
        null=True,
    )
```

```py [ManyToManyField]
"""
每个学生可以参加多个小组，同时每个小组也可以有多个学生
"""
from django.db import models


# 学生
class StudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)

    groups_name = models.ManyToManyField(
        "GroupModel",
        related_name="student_groups",
        verbose_name="小组名",
        blank=True,
    )


# 小组
class GroupModel(models.Model):
    name = models.CharField(verbose_name="小组名", max_length=50)
```

:::

## 数据迁移

Django 模型需要通过命令迁移后才能映射到数据库中

数据库连接配置 [更多详见](../project-settings.md#数据库)

---

### 生成迁移文件

基于模型与数据库之间的差异，生成一个包含最新的变更内容的`.py`文件

迁移文件会自动创建在各个应用目录下的`migrations`目录中

后续可以通过下文命令将这些变更应用到数据库中 [详见下文](#应用迁移文件)

::: code-group

```zsh [命令]
# 生成所有应用的迁移文件
(虚拟环境) % python manage.py makemigrations

# 为指定的自定义应用生成自定义名称的迁移文
(虚拟环境) % python manage.py makemigrations [自定义应用名] --name [自定义迁移文件名]
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
├─ [自定义应用]/                # [!code focus:7]
│   ├─ migrations/
│   │   ├─ __init__.py
│   │   ├─ [迁移文件].py
│   │   ├─ [迁移文件].py
│   │   └─ ...
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

---

### 应用迁移文件

将最新生成的`.py`迁移文件中模型的变更映射到数据库中，以更新数据库结构和数据

```zsh
# 应用最新的迁移文件的内容
(虚拟环境) % python manage.py migrate

# 应用某指定迁移文件的内容
(虚拟环境) % python manage.py migrate [自定义应用名]
(虚拟环境) % python manage.py migrate [自定义应用名] [迁移文件名]
```

---

### 迁移回滚

```zsh [迁移回滚]
# 回滚至指定迁移文件
(虚拟环境) % python manage.py migrate [自定义应用名] [迁移文件名]

# 回滚至应用的初始状态 ( 完全移除已经迁移的所有内容 )
(虚拟环境) % python manage.py migrate [自定义应用名] zero
```

> [!CAUTION] 迁移文件冲突的解决方法
>
> 1. 回滚至指定迁移文件或应用的初始状态
> 2. 删除`migrations`目录下的指定或所有文件 ( 保留`__init__.py`文件 )
> 3. 删除数据库中对应的迁移表或重建数据库
> 4. 重新重新生成迁移文件
> 5. 重新应用上述迁移文件

---

### 数据的导入导出

::: code-group

```zsh [数据导出]
# 导出全部的数据
(虚拟环境) % python manage.py dumpdata --output=[文件名.后缀]

# 仅导出指定的自定义应用中某模型映射的数据
(虚拟环境) % python manage.py dumpdata [自定义应用.模型] --output=[文件名.后缀]
```

```zsh [数据导入]
(虚拟环境) % python manage.py loaddata [文件名.后缀]

```

:::

## 数据的 CRUD 操作

> [!IMPORTANT] 建议通过 Django REST Framework ( DRF )
> [更多详见](/notes/web-backend/frameworks/django/__extensions__/django-rest-framework.md)

---

### 查询所有

|                                      | 说明           |
| ------------------------------------ | -------------- |
| `自定义模型类.objects.all()`         | 获取所有的对象 |
| `自定义模型类.objects.all().count()` | 获取对象的总数 |

::: code-group

```py [Model.objects.all( )]
from django.views import 内置视图类
from django.http import 内置响应对象类
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def get(self, 请求对象, *args, **kwargs):
        querySet类型的数据 = 自定义模型类.objects.all()     # [!code hl]
        列表类型的数据 = list(querySet类型的数据.values())

        return 内置响应对象类(响应数据, status=200)
```

:::

::: details 例子：查询一个数据库表中的所有数据

::: code-group

```py [视图]
import json
from django.views import View
from django.http import JsonResponse
from django.forms import model_to_dict

from .models import StudentModel


class StudentView(View):
    def get(self, request, *args, **kwargs):
        """
        curl -X GET localhost:8000/student/list
        """
        try:
            students_queryset = StudentModel.objects.all()      # [!code hl]
            student_list = list(students_queryset.values())

            return JsonResponse({"data": student_list}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
```

```py [路由]
from django.urls import path

from .views import StudentView

urlpatterns = [
    path("student/list", StudentView.as_view(), name="student_list"),
]
```

```py [模型]
from django.db import models


class StudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ urls.py
    ├─ models.py
    ├─ views.py
    └─ ...
```

:::

---

### 查询一个

|                                             | 说明                                        |
| ------------------------------------------- | ------------------------------------------- |
| `get_object_or_404(自定义模型类, **kwargs)` | 获取一个实例对象，若不存在自动处理 404 响应 |
| `自定义模型类.objects.get(**kwargs)`        | 获取一个实例对象，若不存在则抛出异常        |
| `自定义模型类.objects.first()`              | 获取第一个实例对象                          |
| `自定义模型类.objects.last()`               | 获取最后一个实例对象                        |

::: code-group

```py [get_object_or_404( )]
from django.views import 内置视图类
from django.http import 内置响应对象类
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404             # [!code hl]
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def get(self, 请求对象, *args, **kwargs):
        模型类实例 = get_object_or_404(自定义模型类, 字段=值)   # [!code hl]
        字典类型的数据 = model_to_dict(模型类实例)

        return 内置响应对象类(响应数据, status=200)
```

```py [Model.objects.get( )]
from django.views import 内置视图类
from django.http import 内置响应对象类
from django.forms import model_to_dict
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def get(self, 请求对象, *args, **kwargs):
        try:
            模型类实例 = 自定义模型类.objects.get(字段=值)      # [!code hl]
            字典类型的数据 = model_to_dict(模型类实例)

            return 内置响应对象类(响应数据, status=200)

        except 自定义模型类.DoesNotExist:   # 没找到要删除的数据
            return 内置响应对象类(响应数据, status=404)

        except Exception as e:
            return 内置响应对象类(响应数据, status=500)
```

:::

::: details 例子：用`get_object_or_404()`从数据库表查询一个指定的数据

::: code-group

```py [视图]
import json
from django.views import View
from django.http import JsonResponse
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404

from .models import StudentModel


class StudentView(View):
    """
    curl -X PATCH localhost:8000/student/<pk>
    """
    try:
        student_id = kwargs.get("pk", "")
        target_student_instance = get_object_or_404(StudentModel, id=student_id)

        target_student = model_to_dict(target_student_instance)

        return JsonResponse({"data": target_student}, status=200)

    except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
```

```py [路由]
from django.urls import path

from .views import StudentView

urlpatterns = [
    path("student/<pk>", StudentView.as_view(), name="student_detail"),
]
```

```py [模型]
from django.db import models


class StudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ urls.py
    ├─ models.py
    ├─ views.py
    └─ ...
```

:::

---

### 创建

|                                                           | 说明                             |
| --------------------------------------------------------- | -------------------------------- |
| `自定义模型类.objects.create(**kwargs)`                   | 创建并同时保存一个新数据         |
| `模型实例 = 自定义模型类(**kwargs)`<br/>`模型实例.save()` | 创建一个新数据，然后通过实例保存 |

::: code-group

```py [创建后通过实例保存]
from django.views import 内置视图类
from django.http import 内置响应对象类
from django.forms import model_to_dict
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def post(self, 请求对象, *args, **kwargs):
        新增加的模型类实例 = 自定义模型类(字段=值, 字段=值)     # [!code hl:2]
        新增加的模型类实例.save()

        字典类型的数据 = model_to_dict(新增加的模型类实例)

        return 内置响应对象类(响应数据, status=201)
```

```py [创建同时保存]
from django.views import 内置视图类
from django.http import 内置响应对象类
from django.forms import model_to_dict
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def post(self, 请求对象, *args, **kwargs):
        新增加的模型类实例 = 自定义模型类.objects.create(字段=值, 字段=值)     # [!code hl]

        数据 = model_to_dict(新增加的模型类实例)

        return 内置响应对象类(响应数据, status=201)
```

:::

::: details 例子：通过`创建后通过实例保存`的方式向数据库表中新增一个数据

::: code-group

```py [视图]
import json
from django.views import View
from django.http import JsonResponse
from django.forms import model_to_dict

from .models import StudentModel


class StudentView(View):
    def post(self, request, *args, **kwargs):
        """
        curl -X POST localhost:8000/student/create \
             -H "X-CSRFToken: <csrftoken>" \
             -b "csrftoken=<csrftoken>" \
             -H "Content-Type: application/json" \
             -d '{"name": "值"}'
        """
        try:
            request_body = json.loads(request.body)
            data = {"name": request_body.get("name", "")}

            created_student_instance = StudentModel(**data)
            created_student_instance.save()

            created_student = model_to_dict(created_student_instance)

            return JsonResponse({"data": created_student}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
```

```py [路由]
from django.urls import path

from .views import StudentView

urlpatterns = [
    path("student/create", StudentView.as_view(), name="student_create"),
]
```

```py [模型]
from django.db import models


class StudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ urls.py
    ├─ models.py
    ├─ views.py
    └─ ...
```

:::

---

### 更新

|                                                                                                         | 说明                                                   |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `自定义模型类.objects.filter(**kwargs).update(**values)`                                                | 批量更新所有符合条件的实例                             |
| `模型实例 = 自定义模型类.objects.get(**kwargs)`<br/>`模型实例.字段 = 新值`<br/>`模型实例.save()`        | 更新一个符合条件的实例<br/>若不存在则抛出异常          |
| `模型实例 = get_object_or_404(自定义模型类, **kwargs)`<br/>`模型实例.字段 = 新值`<br/>`模型实例.save()` | 更新一个符合条件的实例<br/>若不存在则自动处理 404 响应 |

::: code-group

```py [更新一个]
from django.views import 内置视图类
from django.http import 内置响应对象类
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def patch(self, 请求对象, *args, **kwargs):
        模型类实例 = get_object_or_404(自定义模型类, 字段=值)   # [!code hl:3]
        模型类实例.字段 = 新值
        模型类实例.save()

        字典类型的数据 = model_to_dict(模型类实例)

        return 内置响应对象类(响应数据, status=200)

    def put(self, 请求对象, *args, **kwargs):
        # 同 patch 方法
        pass
```

```py [批量更新]
from django.views import 内置视图类
from django.http import 内置响应对象类
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def patch(self, 请求对象, *args, **kwargs):
        更新后的数据总数 = 自定义模型类.filter(字段=值).update(字段=值, 字段=值)   # [!code hl]

        return 内置响应对象类(响应数据, status=200)

    def put(self, 请求对象, *args, **kwargs):
        # 同 patch 方法
        pass
```

:::

::: details 例子：更新数据库表中的一个数据

::: code-group

```py [视图]
import json
from django.forms import model_to_dict
from django.views import View
from django.http import JsonResponse

from .models import StudentModel


class StudentView(View):
    def patch(self, request, *args, **kwargs):
        """
        curl -X PATCH localhost:8000/student/<pk> \
             -H "X-CSRFToken: <csrftoken>" \
             -b "csrftoken=<csrftoken>" \
             -H "Content-Type: application/json" \
             -d '{"name": "新值"}'
        """
        try:
            student_id = kwargs.get("pk", "")
            request_body = json.loads(request.body)

            updated_student_instance = StudentModel.objects.get(id=student_id)
            updated_student_instance.name = request_body.get("name", "")
            updated_student_instance.save()

            updated_student = model_to_dict(updated_student_instance)

            return JsonResponse({"data": updated_student}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
```

```py [路由]
from django.urls import path

from .views import StudentView

urlpatterns = [
    path("student/<pk>", StudentView.as_view(), name="student_detail"),
]
```

```py [模型]
from django.db import models


class StudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ urls.py
    ├─ models.py
    ├─ views.py
    └─ ...
```

:::

---

### 删除

|                                                                                | 说明                                                   |
| ------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `自定义模型类.objects.filter(**kwargs).delete()`                               | 批量删除所有符合条件的实例                             |
| `模型实例 = 自定义模型类.objects.get(**kwargs)`<br/>`模型实例.delete()`        | 删除一个符合条件的实例<br/>若不存在则抛出异常          |
| `模型实例 = get_object_or_404(自定义模型类, **kwargs)`<br/>`模型实例.delete()` | 删除一个符合条件的实例<br/>若不存在则自动处理 404 响应 |

::: code-group

```py [删除一个]
from django.views import 内置视图类
from django.http import 内置响应对象类
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def delete(self, 请求对象, *args, **kwargs):
        要删除的模型类实例 = get_object_or_404(自定义模型类, 字段=值)   # [!code hl:2]
        要删除的模型类实例.delete()

        字典类型的数据 = model_to_dict(要删除的模型类实例)

        return 内置响应对象类(响应数据, status=204)
```

```py [批量删除]
from django.views import 内置视图类
from django.http import 内置响应对象类
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def delete(self, 请求对象, *args, **kwargs):
        被删除的模型类实例的总数, 被删除的模型类实例 = StudentModel.objects.filter( # [!code hl:3]
            字段=值,
        ).delete()

        return 内置响应对象类(响应数据, status=204)
```

:::

::: details 例子：从数据库表中删除一个数据

::: code-group

```py [视图]
import json
from django.views import View
from django.http import JsonResponse
from django.forms import model_to_dict
from django.shortcuts import get_object_or_404

from .models import StudentModel


class StudentView(View):
    def delete(self, request, *args, **kwargs):
        """
        curl -X DELETE localhost:8000/student/<pk> \
             -H "X-CSRFToken: <csrftoken>" \
             -b "csrftoken=<csrftoken>"
        """
        try:
            student_id = kwargs.get("pk", "")

            target_student_instance = get_object_or_404(StudentModel, id=student_id)
            target_student_instance.delete()

            target_student = model_to_dict(target_student_instance)

            return JsonResponse({"data": target_student}, status=204)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

```

```py [路由]
from django.urls import path

from .views import StudentView

urlpatterns = [
    path("student/<slug:pk>", StudentView.as_view(), name="student_detail"),
]
```

```py [模型]
from django.db import models


class StudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ urls.py
    ├─ models.py
    ├─ views.py
    └─ ...
```

:::

---

### 过滤

|                                                  | 说明                                            |
| ------------------------------------------------ | ----------------------------------------------- |
| `自定义模型类.objects.filter(**kwargs)`          | 获取符合条件的所有对象                          |
| `自定义模型类.objects.filter(**kwargs).count()`  | 获取符合条件的所有对象的总数                    |
| `自定义模型类.objects.exclude(**kwargs)`         | 获取排除符合条件的所有对象                      |
| `自定义模型类.objects.filter(**kwargs).exists()` | 检查是否存在符合条件的对象<br/>返回值为布尔类型 |

::: code-group

```py [获取所有符合条件的]
from django.views import 内置视图类
from django.http import 内置响应对象类
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def get(self, 请求对象, *args, **kwargs):
        querySet类型的数据 = 自定义模型类.objects.filter(字段=值)         # [!code hl]
        列表类型的数据 = list(querySet类型的数据.values())

        return 内置响应对象类(响应数据, status=200)
```

:::

---

### 排序

|                                                   | 说明                             |
| ------------------------------------------------- | -------------------------------- |
| `自定义模型类.objects.filter().order_by("字段")`  | 获取基于某字段正序排列的所有对象 |
| `自定义模型类.objects.filter().order_by("-字段")` | 获取基于某字段倒序排列的所有对象 |

::: code-group

```py [正序排列]
from django.views import 内置视图类
from django.http import 内置响应对象类
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def get(self, 请求对象, *args, **kwargs):
        querySet类型的数据 = 自定义模型类.objects.order_by("字段")         # [!code hl]
        列表类型的数据 = list(querySet类型的数据.values())

        return 内置响应对象类(响应数据, status=200)
```

```py [倒序排列]
from django.views import 内置视图类
from django.http import 内置响应对象类
from 模型路径 import 自定义模型类


class 自定义视图类(内置视图类):
    def get(self, 请求对象, *args, **kwargs):
        querySet类型的数据 = 自定义模型类.objects.order_by("-字段")         # [!code hl]
        列表类型的数据 = list(querySet类型的数据.values())

        return 内置响应对象类(响应数据, status=200)
```

:::

::: details 例子：查询一个数据库表中的所有数据并排序返回

::: code-group

```py [视图]
import json
from django.views import View
from django.http import JsonResponse

from .models import StudentModel


class StudentView(View):
    def get(self, request, *args, **kwargs):
        """
        curl -X GET localhost:8000/student/list
        curl -X GET localhost:8000/student/list?order_by=age&direction=asc
        curl -X GET localhost:8000/student/list?order_by=age&direction=desc
        curl -X GET localhost:8000/student/list?order_by=id&direction=asc
        """
        try:
            order_by = request.GET.get("order_by")
            direction = request.GET.get("direction", "asc")

            if order_by is None:
                queryset = Student.objects.all()
                students = list(queryset.values())
                return JsonResponse({"data": students}, status=200)

            if direction == "desc":
                queryset = Student.objects.order_by(f"-{order_by}")
            else:
                queryset = Student.objects.order_by(order_by)

            students = list(queryset.values())
            return JsonResponse({"data": students}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
```

```py [路由]
from django.urls import path

from .views import StudentView

urlpatterns = [
    path("student/list", StudentView.as_view(), name="student_list"),
]
```

```py [模型]
from django.db import models


class StudentModel(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=50)
    age = models.IntegerField(verbose_name="年龄")
```

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   └─ ...
│
└─ student/
    ├─ urls.py
    ├─ models.py
    ├─ views.py
    └─ ...
```

:::

## 数据的可视化管理

自定义应用中的模型的相关数据可通过内置管理系统 [Django Admin](../project-admin.md) 进行可视化管理

- 模型需要注册到该应用目录下`admin.py`文件，否则管理页面不显示任何相关内容
- 模型需要数据迁移将内容映射到数据库，否则管理页面会报错

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

```py [自定义应用/admin.py]
from django.contrib import admin
from 模型路径 import 模型类1, 模型类2, 模型类3, 模型类4       # [!code ++:15]

admin.site.register(模型类1)
admin.site.register(模型类2)


@admin.register(模型类3)
class 模型名Admin(admin.ModelAdmin):
    pass


@admin.register(模型类4)
class 模型名Admin(admin.ModelAdmin):
    配置属性 = 值
    配置属性 = 值
```

:::
