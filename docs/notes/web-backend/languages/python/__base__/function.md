# Python 函数

> [!IMPORTANT] 函数 vs 方法
>
> - 函数 ( Function )：一个不依附于任何对象或类，并且可被单独调用执行的代码块
> - 方法 ( Methods )：当函数作为类中的成员时称为方法，只能通过类或类实例对象调用执行

## 定义与使用

普通函数使用关键字`def`定义

函数名使用小写蛇形命名 ( snake_case )

函数必须与上下文间隔两个空行，函数体代码块需要换行并缩进 4 个空格

```py
def 函数():
    # 处理逻辑


函数()
```

空函数的函数体代码块必须要使用关键字`pass`来占位

```py
def 空函数():
    pass
```


## 函数返回值

### 无返回值

函数是一个空函数或无指明返回值时默认返回值为`None`

也可显示指明返回一个`None`表示无返回值

```py
def 函数():
    pass


def 函数():
    # 处理逻辑
    # 处理逻辑


def 函数():
    return


def 函数():
    return None
```

---

### 一个返回值

函数通过关键字`return`返回一个具体的值

当函数执行到关键字`return`时会立即结束，后面的代码不再执行

```py
def 函数():
    return 返回值


返回值 = 函数()
```

---

### 多个返回值

函数可以一个元组形式返回多个返回值

```py
def 函数():
    return 返回值1, 返回值2, 返回值3


返回值 = 函数()
```

::: details 例子：验证函数以元组形式返回多个返回值

```py
def my_func():
    return 100, 'xxx', True


res = my_func()

print(type(res))    # <class 'tuple'>
print(res)          # (100, 'xxx', True)
```

:::

## 函数参数

### 固定参数

| 参数的传递方式 | 说明                                                            |
| :------------: | --------------------------------------------------------------- |
|    位置传递    | 传递数据时，实参与形参的位置顺序一一对应                        |
|   关键字传递   | 传递数据时，可以无视位置顺序而是通过`键=值`的形式明确参数的对应 |

两种参数的传递方式可同时使用，但接收关键字传递写法必须放在位置传递的写法之后

```py
def 函数(形参1, 形参2):
    pass


# 位置传递
函数(实参1, 实参2)

# 关键字传递
函数(形参1=实参1, 形参2=实参2)
函数(形参2=实参2, 形参1=实参1)

函数(实参1, 形参2=实参2)
```

---

### 不定参数

|          | 说明                                                     |
| -------- | -------------------------------------------------------- |
| `*形参`  | 以一个元组的形式接收不定数量的位置参数，约定使用`*args`  |
| `**形参` | 以一个字典的形式不定数量的关键字参数，约定使用`**kwargs` |

两种不定参数可同时使用，但接收`**kwargs`必须放在`*args`之后

::: code-group

```py [*args]
def 函数(*args):
    # 获取一个
    print(args[索引])

    # 遍历所有
    for 索引, 数据值 in enumerate(args):
        pass



函数(实参1, 实参2, 实参3)
```

```py [**kwargs]
def 函数(**kwargs):
    # 获取一个
    print(kwargs['关键字'])
    print(kwargs.get('关键字', 默认值))

    # 遍历所有
    for 关键字, 数据值 in kwargs.items():
        pass


函数(关键字1=值1, 关键字2=值2)
函数(关键字2=值2, 关键字1=值1)
```

```py [*args + **kwargs]
def 函数(*args, **kwargs):
    pass


函数(实参1, 实参2, 关键字1=值1, 关键字2=值2)
函数(实参1, 实参2, 关键字2=值2, 关键字1=值1)
```

:::

> [!CAUTION] 不要滥用字典形式的不定参数
> 尽管`**kwargs`提供了灵活性，但是难以理解与维护<br/>
> 若非要使用时，应该提供明确的函数说明文档，以及在函数内添对加参数值的类型检查

::: details 例子：验证不定参数接收的数据类型

```py
def my_func(*args, **kwargs):
    print(type(args), args)     # <class 'tuple'> (1, 2, 3)
    print(type(kwargs), kwargs) # <class 'dict'>  {'a': 'a', 'b': 'b', 'c': 'c'}


my_func(1, 2, 3, a="a", b="b", c="c")
```

:::

---

### 参数默认值

函数在定义形参时可同时为其指定默认值

若形参有默认值且没有接收到对应位置的实参时，则函数内使用形参的默认值

指定默认值的形参必须定义在所有无默认值的形参之后

```py
def 函数(形参1=默认值, 形参2=默认值):
    pass


函数(实参1, 实参2)
函数(实参1)
函数()
```

> [!IMPORTANT] 函数参数的默认值的改变会一直保留
> Python 的函数参数默认值被设计为在不同函数调用期间会被一直保留以及共享<br/>
> 即无论函数在哪一次调用时修改了参数，默认值都会保留上次修改的状态
>
> ::: code-group
>
> ```py [列表]
> def my_function(v, l = []):
>  l.append(v)
>  print(l)
>
>
> my_function(1)  # [1]
> my_function(2)  # [1, 2]
> my_function(3)  # [1, 2, 3]
> ```
>
> ```py [字典]
> def my_function(v, d = {}):
>  d[v]=v
>  print(d)
>
>
> my_function(1)  # {1: 1}
> my_function(2)  # {1: 1, 2: 2}
> my_function(3)  # {1: 1, 2: 2, 3: 3}
> ```
>
> :::
>
> 可变类型数据的参数默认值应该使用`None`
>
> ::: code-group
>
> ```py [列表]
> def my_function(v, l=None):
>     if l is None:
>         l = []
>     l.append(v)
>     print(l)
>
> my_function(1)  # [1]
> my_function(2)  # [2]
> my_function(3)  # [3]
> ```
>
> ```py [字典]
> def my_function(v, l=None):
>     if l is None:
>         l = {}
>     l[v]=v
>     print(l)
>
> my_function(1)  # {1: 1}
> my_function(2)  # {2: 2}
> my_function(3)  # {3: 3}
> ```
>
> :::

## 特殊函数

### Lambda 函数 ( 匿名函数 )

Lambda 函数使用关键字`lambda`定义

Lambda 函数只能写为一行，常用于定义简单的不需要重用的逻辑

```py
函数 = lambda: 有返回值的逻辑语句

函数 = lambda 参数: 有返回值的逻辑语句

函数 = lambda 参数1, 参数2: 有返回值的逻辑语句
```

::: details 例子：Lambda 函数作为回调函数

```py
def my_func(f):
    res = f(10, 20)
    print(res)


my_func(lambda a, b: a + b)  # 30
my_func(lambda a, b: a - b)  # -10
my_func(lambda a, b: a * b)  # 200
```

:::

::: details 例子：Lambda 函数结合列表方法`filter()`对列表进行过滤

```py
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))

print(even_numbers)   # [2, 4, 6]
```

:::

::: details 例子：Lambda 函数结合列表方法`sort()`对字典类型元素的列表进行排序

```py
l = [{"name": "Andy", "age": 28}, {"name": "Tom", "age": 16}]

l.sort(key=lambda item: item["age"])
print(l)  # [{'name': 'Tom', 'age': 16}, {'name': 'Andy', 'age': 28}]

l.sort(key=lambda item: item["age"], reverse=True)
print(l)  # [{'name': 'Andy', 'age': 28}, {'name': 'Tom', 'age': 16}]
```

:::

---

### 装饰器

> Decorators

装饰器是个函数，可用于实现在不修改某个现有函数或方法的前提下为其增加额外的新功能

现有函数使用装饰器时可在的顶部使用语法糖`@装饰器名`

可以同时使用多个装饰器，执行顺序为：外层→内层→现有函数→内层→外层

- 装饰器函数接受一个函数作为参数
- 装饰器函数内部定义一个作为附加功能的函数并作为返回值返回
- 装饰器函数内部的新功能函数中调用函数参数并追加其他额外的处理

```py
def 装饰器1(函数):
    def 新功能(*args, **kwargs):
        # ...
        函数(*args, **kwargs)
        # ...

    return 新功能


def 装饰器2(函数):
    def 新功能(*args, **kwargs):
        # ...
        函数(*args, **kwargs)
        # ...

    return 新功能


# --------------------------------------------------------------------------------
# --------------------------------------------------------------------------------


@装饰器1
def 某个现有函数1():
    # ...


@装饰器1
@装饰器2
def 某个现有函数2(形参1, 形参2):
    # ...


某个现有函数1()
某个现有函数2(实参1, 实参2)
```

::: details 例子：验证函数同时使用多个装饰器时的装饰器与函数自身逻辑执行顺序

```py
def my_decorator_1(f):
    def new_func(*args, **kwargs):
        print("-----")
        f(*args, **kwargs)
        print("-----")

    return new_func


def my_decorator_2(f):
    def new_func(*args, **kwargs):
        print("+++++")
        f(*args, **kwargs)
        print("+++++")

    return new_func



@my_decorator_1
@my_decorator_2
def print_something(message):
    print(message)


print_something("xxxxx")
# -----
# +++++
# xxxxx
# +++++
# -----
```

:::

## 常用操作

### 递归

> Recursion

递归是指函数在自己内部调用自己

为了避免出现无限递归导致的内存泄露，执行递归时必须要有一个判断条件

```py
def 函数():
    if 条件:
        函数()
```

::: details 例子：利用递归替换一个嵌套字典中某个键值对的值

```py
def replace_obj_value(obj, target_key, new_value):
    new_obj = {}

    for key, value in obj.items():
        if isinstance(value, dict):
            new_obj[key] = replace_obj_value(value, target_key, new_value)
        else:
            if key == target_key:
                new_obj[key] = new_value
            else:
                new_obj[key] = value

    return new_obj


obj = {
    "a": 100,
    "b": 200,
    "obj_2": {
        "a": 100,
        "b": 200,
        "obj_3": {
            "a": 100,
            "b": 200,
        },
    },
}

print(replace_obj_value(obj, "a", 900))
# {'a': 900, 'b': 200, 'obj_2': {'a': 900, 'b': 200, 'obj_3': {'a': 900, 'b': 200}}}
print(replace_obj_value(obj, "b", 900))
# {'a': 100, 'b': 900, 'obj_2': {'a': 100, 'b': 900, 'obj_3': {'a': 100, 'b': 900}}}
print(replace_obj_value(obj, "xxxxx", 900))
# {'a': 100, 'b': 200, 'obj_2': {'a': 100, 'b': 200, 'obj_3': {'a': 100, 'b': 200}}}
```

:::

---

### 闭包

> Closure

闭包是指函数将一个函数作为返回值返回，被返回的函数即闭包函数

闭包常用于抛出函数内私有变量避免全局污染、创建工厂函数、创建装饰器函数等

闭包函数中修改外层函数中的局部变量时需要使用关键字`nonlocal`

```py
def 函数():
    变量 = 值

    def 闭包函数():
        # ...

    return 闭包函数


闭包函数 = 函数()
闭包函数()
```

> [!CAUTION] 不要滥用闭包
> 闭包的变量会一直保存在内存中，尤其是在循环、频繁执行的逻辑中会导致内存泄漏和性能下降

::: details 例子：通过闭包实现在函数外访问函数作用域中变量

```py
def get_person():
    person = "Andy"

    def f():
        return person

    return f

person = get_person()()
print(person)   # "Andy"
```

:::

::: details 例子：利用闭包创建一个简单的工厂函数， 根据外层函数接收的参数的不同创建不同的函数

```py
from typing import Callable


def create_logger(logger_type):
    def logger(message):
        print(f"{logger_type} {message}")

    return logger


success_logger = create_logger("[SUCCESS]")
success_logger(111)     # [SUCCESS] 111
success_logger(222)     # [SUCCESS] 222

error_logger = create_logger("[ERROR]")
error_logger(111)       # [ERROR] 111
error_logger(222)       # [ERROR] 222
```

:::

::: details 例子：使用关键字`nonlocal`在闭包函数中修改其外层定义的变量

```py
def account_create():
    initial_amount = 0

    def use_atm(num, deposit=True):
        nonlocal initial_amount     # [!code hl]
        initial_amount += num
        print(f"{num}\tTotal={initial_amount}")

    return use_atm


use_atm = account_create()   # 该语句执行时私有变量 initial_amount 被创建并一直保存在内存中

use_atm(100)                 # +100 Total=100
use_atm(200)                 # +200 Total=300
use_atm(-50)                 # -50  Total=250
use_atm(-100)                # -100 Total=150
```

:::
