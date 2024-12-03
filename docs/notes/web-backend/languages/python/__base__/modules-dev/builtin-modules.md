# Python 常用内置模块

## os

提供了操作系统相关的功能

```py
import os

# ...
```

| 常用模块成员         | 说明                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `os.name`            | 当前操作系统的名称，返回值为`nt`、`posix`<br/>windows系统: `nt`<br/>非windows系统: `posix`  |
| `os.sep`             | 当前操作系统中路径的分隔符，返回值为一个字符串 <br/>windows系统: `\`<br/>非windows系统: `/` |
| `os.environ.get()`   | 获取参数指定的环境变量                                                                      |
| `os.path.abspath()`  | 获取参数指定的文件的完整绝对路径，返回值为一个字符串                                        |
| `os.path.isdir()`    | 判断参数指定的路径是否是一个目录，返回值为一个布尔值                                        |
| `os.path.isfile()`   | 判断参数指定的路径是否是一个文件，返回值为一个布尔值                                        |
| `os.path.isexists()` | 判断参数指定的路径是否存在，返回值为一个布尔值                                              |
| `os.path.splitext()` | 将参数指定的完整文件名分割为文件名与后缀名，返回值为一个元组                                |

## math

提供了基础数学计算相关的功能

```py
import math

# ...
```

| 常用模块成员   | 说明                                    | 例子                                                          |
| -------------- | --------------------------------------- | ------------------------------------------------------------- |
| `math.floor()` | 将参数数值向下取整                      | `print(math.floor(0.4)) # 0`<br/>`print(math.floor(0.6)) # 0` |
| `math.ceil()`  | 将参数数值向上取整                      | `print(math.ceil(0.4)) # 1`<br/>`print(math.ceil(0.6)) # 1`   |
| `round()`      | 将参数四舍五入 ( 不是 math 模块的成员 ) | `print(round(0.4)) # 0`<br/>`print(round(0.6) # 1`            |

## random

提供了随机数相关的功能

```py
import random

# ...
```

| 常用模块成员       | 说明                                     | 例子                     |
| ------------------ | ---------------------------------------- | ------------------------ |
| `random.random()`  | 获取一个`[0, 1)`之间的随机浮点数         |                          |
| `random.randint()` | 获取一个`[a, b]`之间的随机整数           | `random.randint(1, 5)`   |
| `random.choice()`  | 从一个可迭代对象中随机获取一个成员       | `random.choice(对象)`    |
| `random.sample()`  | 从一个可迭代对象中随机获取指定个数的成员 | `random.sample(对象, n)` |

## datetime

提供了日期时间操作相关的功能

```py
import datetime

# ...
```

| 常用模块成员                                      | 说明                        |
| ------------------------------------------------- | --------------------------- |
| `datetime.datetime.now()`                         | 获取当前的日期时间          |
| `datetime.datetime.now() + datetime.timedelta(3)` | 获取距离当前3天后的日期时间 |

## time

提供了时间操作相关的功能

```py
import time

# ...
```

| 常用模块成员      | 说明             | 例子                                                                                              |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| `time.time()`     | 获取时间戳秒数   |                                                                                                   |
| `time.strftime()` | 指定时间输出格式 | `print(time.strftime("%Y-%m-%d")) # 2025-01-01`<br/>`print(time.strftime("%H:%M:%S")) # 12:00:01` |
| `time.sleep()`    | 线程暂停指定秒数 | `time.sleep(3)`                                                                                   |

## hashlib

提供了字符加密操作相关的功能

具体包含了 MD5、SHA1、SHA224、SHA256、SHA354、SHA512 加密算法

```py
import hashlib

# ...
```

## json

提供了数据序列化、反序列化操作相关的功能

```py
import json

# ...
```

| 常用模块成员   | 说明                                                                |
| -------------- | ------------------------------------------------------------------- |
| `json.dumps()` | 用于实现序列化                                                      |
| `json.loads()` | 用于实现反序列化                                                    |
| `json.dump()`  | 用于实现序列化，并自动将 JSON 格式数据字符串写入一个文件对象        |
| `json.load()`  | 用于实现反序列化， 自动读取一个 JSON 文件对象内容并转为 Python 数据 |

> [!IMPORTANT] 序列化 vs 反序列化
>
> - 序列化: Python 数据 → JSON 格式数据
> - 反序列化: JSON 数据 → Python 数据

::: details 例子：验证序列化与反序列化

::: code-group

```py{0} [序列化]
import json

data = [
    {'name': 'Andy', 'age': 28},
    {'name': 'Tom', 'age': 16},
]

json_str = json.dumps(data)
print(json_str)         # '[{"name": "Andy", "age": 28}, {"name": "Tom", "age": 16}]'
print(type(json_str))   # <class 'str'>
```

```py{0} [反序列化]
import json

json_str = """
[
    { "name": "Andy", "age": 28 },
    { "name": "Tom", "age": 16 }
]
"""

data = json.loads(json_str)
print(data)             # [{'name': 'Andy', 'age': 28}, {'name': 'Tom', 'age': 16}]
print(type(data))       # <class 'list'>
```

:::

::: details 例子：序列化与反序列户结合文件的读写操作

::: code-group

```py{0} [序列化]
import json

data = [
    {'name': 'Andy', 'age': 28},
    {'name': 'Tom', 'age': 16},
]

with open("./data.json", "w") as f:
    json.dump(data, f)
```

```py{0} [反序列化]
import json

with open("./data.json.json", "r") as f:
    data = json.load(f)
    print(data)
    print(type(data))


# "[{'name': 'Andy', 'age': 28}, {'name': 'Tom', 'age': 16}]"
# <class 'list'>
```

:::
