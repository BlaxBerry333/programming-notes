# Python 不可变数据类型

> Immutable Types

## 整数 ( int )

整数类型包含正负整数、数值`0`

```py
num1 = 100
num2 = -100
num3 = 0
```

## 浮点数 ( float )

浮点数类型包含正负浮点数

```py
num1 = 100.0
num2 = 100.001
num3 = -100.0
```

> [!CAUTION] 浮点数直接进行算数运算时会有误差
> 可通过内置函数`round()`四舍五入后修正误差
>
> ```py
> print(0.1 + 0.2)                # 0.30000000000000004     # [!code --:2]
> print(0.1 + 0.02)               # 0.12000000000000001
> print(round((0.1 + 0.2), 1))    # 0.3                     # [!code ++:2]
> print(round((0.1 + 0.02), 2))   # 0.12
> ```

## 字符串 ( str )

字符串类型为一个由单引号`''`、双引号`""`、三引号`""""""`包裹的字符

Python 中不区分单引号与双引号

```py
变量 = str()
变量 = ''
变量 = ""
变量 = """"""

变量 = '字符串'
变量 = "字符串"
变量 = """字符串"""
```

---

### 常用操作

```py
# 获取长度
print(len("字符串"))

# 获取字符
print("字符串"[索引])

# 字符串拼接
新字符串 = f"字符串 {数据} {表达式}""

# 字符串重复
新字符串 = "字符串" * 重复次数

# 字符串比较大小 ( ASCII 码值的大小 )
布尔值 = "字符串" > "字符串"
布尔值 = "字符串" < "字符串"
```

---

### 常用内置方法

|             | 说明                                                   |
| ----------- | ------------------------------------------------------ |
| `index()`   | 查询字符串中某个成员的索引，若不存在则报错`ValueError` |
| `count()`   | 统计字符串中某一个成员的出现次数                       |
| `replace()` | 替换了原字符串中所有指定成员，返回为一个新字符串       |
| `split()`   | 分隔字符串成员，返回为一个新字符串                     |
| `strip()`   | 移除字符串首尾空白字符，返回一个新字符串               |

## 布尔值 ( bool )

`bool`布尔值类型只有`True`、`False`两个值

```py
# 显示声明
bool1 = True
bool2 = False

# 隐式声明
bool3 = 判断语句
```

布尔值可直接用于算术运算，`True`表示`1`，`False`表示`0`

::: details 例子：实现布尔值与数值的算数运算类型 → 整数类型的隐式转换

```py
print(True + 100)    # 101
print(False + 100)   # 100
print(False * 100)   # 0
print(True + True)   # 2
print(True + False)  # 1
```

:::

> [!IMPORTANT] 判断布尔值时建议使用身份运算符<code>is</code>、<code>is not</code>
>
> ```py
> 变量1 = True
>
> if 变量1 == False:    # [!code --]
> if 变量1 is False:    # [!code ++]
>     # ...
> ```

## 空类型 ( None )

`None`表示一个空值

```py
# 显示声明
v1 = None

# 隐式声明
def func():
    pass


print(func())
```

> [!IMPORTANT] 判断<code>None</code>建议使用身份运算符<code>is</code>、<code>is not</code>
>
> ```py
> 变量 = None
>
> if 变量 == False:    # [!code --]
> if 变量 is False:    # [!code ++]
>     # ...
> ```

> [!CAUTION] 判断<code>None</code>不推荐使用运算符<code>==</code>
> 以防止数据所属的类中有重写覆盖的`__eq__()`方法时产生的意外行为
>
> ```py
> class MyClass:
>     def __eq__(self, other):
>         return True   # 重写方法强制相等
>
>
> obj = MyClass()
> print(obj == None)    # True
> print(obj is None)    # False # [!code error]
> ```

## 元组 ( tuple )

```py
元组 = tuple()
元组 = ()

元组 = (元素, )
元组 = (元素1, 元素2, 元素3)
```

元组被定义后其中元素的个数与值都不能被改变

但是元组中元素为可变类型数据时 ( 列表、字典 ) 该元素可被修改

```py{0}
t = (
    "A",
    {"x": 1},
    ["C", "D"],
)

t[0] = "X"  # 报错 TypeError  # [!code error]
t[3] = "D"  # 报错 TypeError  # [!code error]

t[2][1] = "X"
print(t)    # ('A', 'B', ['C', 'X'])
t[1]["x"] = 1111
print(t)    #  ('A', {'x': 1111}, ['C', 'X'])
```

---

### 常用操作

```py
# 获取长度
print(len(元组))

# 检查成员
print(元素 in 元组)
print(元素 not in 元组)

# 获取元素
print(元组[索引])

# 元组解包
元素1, 元素2 = 元组
元素1, 元素2, *剩余元素 = 元组
```

---

### 常用内置方法

|           | 说明                                                 |
| --------- | ---------------------------------------------------- |
| `index()` | 查询元组中某个元素的索引，若不存在则报错`ValueError` |
| `count()` | 统计统计元组中某一个元素的出现次数                   |