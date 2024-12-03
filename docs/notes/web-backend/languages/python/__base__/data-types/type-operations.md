# Python 类型操作

## 类型判断

### type( )

用于获取一个数据的类型，返回值为一个类

仅能用于简单的类型判断，无法判断类的继承关系

```py
类 = type(数据)
```

::: details 例子：验证实验`type()`无法判断类的继承关系

```py
class A:
    pass


class B(A):
    pass


a = A()
print(type(a))          # <class '__main__.A'>
print(type(a) == A)     # True

b = B()
print(type(b))          # <class '__main__.B'>
print(type(b) == B)     # True
print(type(b) == A)     # False
```

:::

---

### isinstance( )

用于判断数据是否为一个类的实例对象，返回值为一个布尔值

```py
布尔值 = isinstance(数据, 类)
```

::: details 例子：验证使用`isinstance()`判断类的继承关系

```py
class A:
    pass


class B(A):
    pass


a = A()
print(isinstance(a, A))     # True

b = B()
print(isinstance(b, A))     # True
```

:::

---

### issubclass( )

用于判断一个类是否为另一个类的子类，返回值为一个布尔值

仅能用于判断类的继承

```py
布尔值 = issubclass(类, 类)
```

::: details 例子：验证使用`issubclass()`判断类的继承关系

```py
class A:
    pass


class B(A):
    pass


print(issubclass(B, A))     # True
```

:::

## 类型转换

### 显式转换

> Explicit Type Conversion

| 常用内置函数 | 说明                                                                                            |
| :----------: | ----------------------------------------------------------------------------------------------- |
|   `int()`    | 将浮点数、整数字符串转为整数值，非数值字符串的场合一律报错                                      |
|  `float()`   | 将整数、数值字符串转为浮点数，非数值字符串的场合一律报错                                        |
|   `str()`    | 强制将数据转为字符串                                                                            |
|   `bool()`   | 强制将数据转为布尔值<br/>仅`0`、`""`、`None`、`()`、`[]`、`{}`、`set()`、`False`会转换为`False` |

---

### 隐式转换

> Implicit Type Conversion

|                        | 说明                                 |
| :--------------------: | ------------------------------------ |
| 布尔值与数值的算数运算 | 将布尔值转为对应的数值后进行算数运算 |
| 整数与浮点数的算数运算 | 返回值转为浮点数                     |
|         逻辑非         | 将数据转为对应的布尔值               |

## 类型注解

> Type Hints
