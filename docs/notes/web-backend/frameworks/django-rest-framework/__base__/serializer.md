# DRF 序列化器

> Serializer

可用于处理 Django 模型实例与数据的序列化转换、字段验证 ( 比原生 Django 更简洁 )

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
