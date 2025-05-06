# Django 模板

> Templates

Django 模版是个动态渲染数据的 HTML 页面，通常作为 [视图 ( View )](./view.md) 的响应结果返回给客户端

模版不是必需的 ( 比如：单纯 API Server、前后端分离的项目 )

## 所处位置

Django 模版文件可定义在项目根目录下的 templates 目录、或者自定义应用目录下饿自定义路径

模版文件的查询路径等需要在主应用中的配置文件中设置 [更多详见](../project-settings.md#模版相关)

::: code-group

```[目录结构]
[项目目录]
├─ manage.py
│
├─ [主应用]/
│   ├─ settings.py
│   └─ ...
│
├─ [自定义应用]/
│   ├─ ...
│   └─ [自定义路径]             # [!code ++:4]
│       ├─ 模版文件.html
│       ├─ 模版文件.html
│       └─ ...
│
└─ templates/                 # [!code ++:4]
    ├─ 模版文件.html
    ├─ 模版文件.html
    └─ ...
```

```py [主应用/settings.py]
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR / "templates",             # 项目根目录下的 templates 目录
            BASE_DIR / "自定义应用/自定义路径",    # 自定义路径
        ],
        "APP_DIRS": True,
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

:::

## 模版的响应

::: code-group

```py [视图类]
from django.views.generic import TemplateView


class 视图类(TemplateView):
    template_name = "模版文件.html"
    extra_context = {"变量1": 值, "变量2": 值}
```

```py [视图函数]
from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import HttpResponse


def 视图函数(请求对象):
    return render(
        请求对象,
        template_name="模版文件.html",
        extra_context = {"变量1": 值, "变量2": 值},
    )


def 视图函数(请求对象):
    html_str = render_to_string("模版文件.html")
    return HttpResponse(html_str)
```

:::

## 模版语法 ( DTL )

> DTL ( Django Template Language )

Django 模版引擎默认使用`django.template.backends.django.DjangoTemplates`

---

### 数据渲染

::: code-group

```html{0} [模版]
{{ 变量 }}
{{ 列表.索引 }}
{{ 字典.键 }}
```

```py [视图类]
from django.views.generic import TemplateView


class 视图类(TemplateView):
    template_name = "模版文件.html"
    extra_context = {"变量1": 值, "变量2": 值}
```

```py [视图函数]
from django.shortcuts import render


def 视图函数(request):
    return render(
        request,
        template_name="模版文件.html",
        context={"变量1": 值, "变量2": 值},
    )
```

:::

::: details 例子：验证在模版中直接渲染变量的值

::: code-group

```html{0} [模版]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>List</title>
  </head>
  <body>
    <p>{{ var_a }}</p>                                      // [!code focus:4]
    <p>{{ var_b }}</p>
    <p>{{ var_c.0 }} {{ var_c.1 }} {{ var_c.2 }}</p>
    <p>{{ var_d.A }} {{ var_d.B}}</p>
  </body>
</html>
```

```py [视图类]
from django.views.generic import TemplateView


class ListView(TemplateView):
    template_name = "list.html"
    extra_context = {
        "var_a": 100,
        "var_b": "hello",
        "var_c": [1, 2, 3],
        "var_d": {"A": "AAA", "B": "BBB"},
    }
```

```py [视图函数]
from django.shortcuts import render


def render_list(request):
    return render(
        request,
        template_name="list.html",
        context={
            "var_a": 100,
            "var_b": "hello",
            "var_c": [1, 2, 3],
            "var_d": {"A": "AAA", "B": "BBB"},
        },
    )
```

:::

---

### 条件判断 ( if 标签 )

模版的`if`标签用于实现模版数据渲染的条件判断

判断条件支持 Python 中的逻辑运算符、比较运算符、成员运算符

```html{0}
{% if 条件1 %}
    <!-- 标签与内容 -->
{% elif 条件2 %}
    <!-- 标签与内容 -->
{% else %}
    <!-- 标签与内容 -->
{% endif %}
```

---

### 循环遍历 ( for 标签 )

模版的`for`标签用于实现模版数据渲染的循环遍历

模版的循环遍历不支持 Python 关键字`break`、`continue`

```html{0}
<!-- 正向遍历 -->
{% for 变量 in 可遍历对象 %}
    <!-- 标签与内容 -->
{% endfor %}


<!-- 反向遍历 -->
{% for 变量 in 可遍历对象 reversed %}
    <!-- 标签与内容 -->
{% endfor %}
```

---

### 变量缓存 ( with 标签 )

模版`with`标签可用于将一个模版中多次使用的变量的值缓存为一个自定义变量

自定义缓存变量仅能用于`witch`标签作用域内

```html{0}
{% with 变量 as 自定义缓存变量 %}
    {{ 变量 }}              // [!code --]
    {{ 自定义缓存变量 }}      // [!code ++]
{% endwith %}
```

---

### 路由反转 ( url 标签 )

模版`url`标签可用于路由反转，功能类似于路由中的内置方法`reverse()`

::: code-group

```html{0} [模版]
<!-- 无参数 -->
<a href="{% url '自定义路由名称' %}">...</a>

<!-- 查询字符串参数 -->
 <a href="{% url '自定义路由名称' %}?参数=值">...</a>

<!-- 动态路由参数 -->
<a href="{% url '自定义路由名称' 参数1的值 参数2的值 %}">...</a>
<a href="{% url '自定义路由名称' 参数1=值 参数2=值 %}">...</a>
```

```py [路由]
from django.urls import path, include
from 自定义应用.视图模块路径 import 视图

urlpatterns = [
    path('请求路径', 视图, name="自定义路由名"),
    path('请求路径/<参数1>/<参数2>', 视图, name="自定义路由名"),
]
```

:::

---

### 数据过滤器

```html{0}
{{ 数据|过滤器: 参数 }}
```

::: details `length`：返回数据容器的长度

```html{0}
{{ 变量|length }}
```

:::

::: details `date`：处理展示的日期时间

```html{0}
{{ 日期对象变量|date:"Y/m/d H:i:s" }}
```

:::

::: details `default`：设置数据为假时的默认值

```html{0}
{{ 变量|default:"默认值" }}
```

:::

::: details `default_if_none`：设置数据为`None`时的默认值

```html{0}
{{ 变量|default_if_none:"默认值" }}
```

:::

::: details `cut`：剔除字符串中所有指定的字符串

```html{0}
{{ 字符串变量|cut:"要剔除的字符串" }}
```

:::

::: details `stringtags`：剔除字符串中所有 HTML 的标签

```html{0}
{{ 变量|stringtags }}
```

:::

::: details `truncatechars`：限定字符串展示的长度并用`...`省略展示超出的内容

```html{0}
{{ 变量|stringtags:展示的长度 }}
```

:::

::: details `truncatechars_html`：若字符串含有 HTML 标签时仅省略展示内容但不切割外部标签

```html{0}
{{ 变量|truncatechars_html:展示的长度 }}
```

:::

---

### 模版导入

模版`include`标签可用于将其他模版 ( 子组件 ) 导入当前的模版

导入的子模版中可以直接使用当前父模版中接收自视图传递的数据

```html{0}
{% include "其他模版文件.html" %}

<!-- 当前模版文件的标签与内容 -->
<!-- 当前模版文件的标签与内容 -->

{% include "其他模版文件.html" %}
```

---

### 模版继承

模版`extends`标签可用于在子模版中继承一个公用模版中的内容

模版`block`标签可用于在公用模版中定义一个占位 ( 插槽 ) 供子模版在继承后插入自定义内容

::: code-group

```html{0} [父模版]
{% block 自定义占位名1 %}
    <!-- 插入此处 -->
{% endblock %}

<!-- 公用的标签与内容 -->
<!-- 公用的标签与内容 -->

{% block 自定义占位名2 %}
    <!-- 插入此处 -->
{% endblock %}
```

```html{0} [子模版]
{% extends "公用模版文件.html" %}

{% block 自定义占位名1 %}
    <!-- 要插入的标签与内容 -->
{% endblock %}

{% block 自定义占位名2 %}
    <!-- 要插入的标签与内容 -->
{% endblock %}
```

:::
