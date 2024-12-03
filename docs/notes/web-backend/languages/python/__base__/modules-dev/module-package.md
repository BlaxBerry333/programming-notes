# Python 模块与包

Python 是通过模块与包来实现模块化开发

> [!IMPORTANT] 模块、包
>
> - 模块 ( Module ): 项目中每个`.py`文件都可被视为一个模块
> - 包 ( Package ): 包含一系列相关模块文件的目录

::: code-group

```[目录结构]
[工作区目录]
│
├─ [包]
│  ├─ __init__.py
│  ├─ [模块].py
│  ├─ [模块].py
│  └─ ...
│
├─ [包]
│  ├─ __init__.py
│  ├─ [模块].py
│  ├─ [模块].py
│  ├─ ...
│  └─ [包]
│      ├─ __init__.py
│      ├─ [模块].py
│      ├─ [模块].py
│      └─ ...
│
└─ ...
```

:::

## 模块

### 模块的导入

通过关键字`import`导入模块文件

导入的模块中的成员可在当前模块中直接使用

::: code-group

```py [完全导入]
import 模块

from 模块 import *

from 包.子包 import 模块

from 包.子包.模块 import *
```

```py [部分导入]
from 模块 import 成员
from 模块 import 成员1, 成员2

from 包.子包.模块 import 成员
from 包.子包.模块 import 成员1, 成员2
```

```py [别名导入]
import 模块 as 别名

from 模块 import 成员 as 别名

from 包.子包 import 模块 as 别名

from 包.子包.模块 import 成员 as 别名
```

:::

> [!IMPORTANT] 相对导入 vs 绝对导入
>
> ```py
> # 相对当前模块文件的相对路径进行导入
> from . import 模块
> from .. import 模块
>
> # 相对于整个工作区的绝对路径进行导入
> from 包.子包 import 模块
> ```

---

### 模块的导出

模块文件默认导出其中全部成员

每个模块文件都有一个内置变量`__all__`用于当前模块对外导出的成员

约定名字前面有前缀`_`的成员仅在当前模块内使用

::: code-group

```py [完全导出]
# 定义成员1
# 定义成员2
# 定义成员3
```

```py [部分导出]
# 定义成员1
# 定义成员2
# 定义成员3

__all__ = ["定义成员1", "定义成员2"]
```

:::

::: details 例子：模块内利用内置变量`__all__`对外导出部分成员

::: code-group

```[目录结构]
[项目目录]
├─ ...
├─ main.py
└─ tools.py
```

```py [main.py]
from tools import *

a()   # "aaaaa"
b()   # 报错 NameError    # [!code error]
```

```py [tools.py]
__all__ = ["a"]


def a():
    print("aaaaa")


def b():
    print("bbbbb")
```

:::

---

### \_\_name\_\_

每个模块文件都有一个内置变量`__name__`

当模块文件被直接执行时该变量值为`"__main__"`

::: details 例子：利用内置变量`__name__`判断当前模块的测试代码是否应该自动执行

```py
def say_hello():
    print("Hello")


def say_something(msg):
    print(msg)


if __name__ == "__main__":      # [!code hl:7]
    """
    测试代码
    下文代码在模块被导入时不会自动调用，仅在直接执行该文件时才调用
    """
    say_hello()
    say_something("test...")
```

:::

## 包

### \_\_init\_\_.py

目录中存在`__init__.py`文件时该目录被视为一个 Python 包

该文件主要用于汇总以及限定当前包目录中的模块以方便导入、定义包级别的初始化逻辑

该文件也可以为空，用于仅仅说明当前目录为一个包

::: code-group

```py [__init__.py]
"""
包的说明文档
包的说明文档
"""
from .模块1 import *
from .模块2 import *
from .模块3 import 成员1, 成员2
# ...
```

```[目录结构]
[工作区目录]
│
└─ [包]
   ├─ __init__.py
   ├─ [模块1].py
   ├─ [模块2].py
   ├─ [模块3].py
   └─ ...
```

:::
