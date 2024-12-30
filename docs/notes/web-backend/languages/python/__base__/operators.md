# Python 运算符

## 算数运算符

> Arithmetic Operators

| 运算符 | 说明                                                            | 例子                             |
| :----: | --------------------------------------------------------------- | -------------------------------- |
|  `+`   | 左右都是数值类型时：加法运算<br/>左右包含布尔值类型时：加法运算 | `10 + 2`<br/>`10 + true + false` |
|  `-`   | 减法运算                                                        | `10 - 2`                         |
|  `*`   | 乘法运算                                                        | `10 * 2`                         |
|  `/`   | 除法运算                                                        | `10 / 2`                         |
|  `**`  | 幂运算                                                          | `10 ** 2`                        |
|  `%`   | 取余运算                                                        | `10 % 2`                         |
|  `//`  | 整除运算                                                        | `10 // 2`                        |

## 赋值运算符

> Assignment Operators

| 运算符 | 说明                                                          | 例子                       |
| :----: | ------------------------------------------------------------- | -------------------------- |
|  `=`   | 赋值操作<br/>将右侧值直接赋值给左侧变量                       | `a = b`                    |
|  `+=`  | 加等于操作<br/>将左侧变量当前值加上右侧值再后赋值给左侧变量   | `a += b` ( `a = a + b` )   |
|  `-=`  | 减等于操作<br/>将左侧变量当前值减去右侧值再后赋值给左侧变量   | `a -= b` ( `a = a - b` )   |
|  `*=`  | 乘等于操作<br/>将左侧变量当前值乘以右侧值再后赋值给左侧变量   | `a *= b` ( `a = a * b` )   |
|  `/=`  | 除等于操作<br/>将左侧变量当前值除以右侧值再后赋值给左侧变量   | `a /= b` ( `a = a / b` )   |
| `//=`  | 整除等于操作<br/>将左侧变量当前值除以右侧值再后赋值给左侧变量 | `a //= b` ( `a = a // b` ) |

## 比较运算符

> Comparison Operators

比较运算的结果是一个布尔值 ( `True`或`False` )

| 运算符 | 说明             | 例子     |
| :----: | ---------------- | -------- |
|  `>`   | 左侧大于右侧     | `a > b`  |
|  `<`   | 左侧小于右侧     | `a < b`  |
|  `>=`  | 左侧大于等于右侧 | `a >= b` |
|  `<=`  | 左侧小于等于右侧 | `a <= b` |
|  `==`  | 左侧等于右侧     | `a == b` |
|  `!=`  | 左侧不等于右侧   | `a != b` |

## 逻辑运算符

> Logical Operators

| 运算符 | 说明   | 例子          |
| :----: | ------ | ------------- |
| `and`  | 与运算 | `a = b and c` |
|  `or`  | 或运算 | `a = b or c`  |
| `not`  | 非运算 | `a = not b`   |

```py{0}
print(True and True, True or True)      # True  True
print(True and False, True or False)    # False True
print(False and True, False or True)    # False True
print(False and False, False or False)  # False False

print(not True)     # False
print(not False)    # True
```

## 成员运算符

> Membership Operators

用于判断某个数据是否为某个可迭代对象 ( 字符串、列表、元组、字典等 ) 的成员

运算的结果是一个布尔值 ( `True`或`False` )

|  运算符  | 说明   | 例子                     |
| :------: | ------ | ------------------------ |
|   `in`   | 是成员 | `数据 in 可迭代对象`     |
| `not in` | 是成员 | `数据 not in 可迭代对象` |

```py{0}
string = "ABCDE"
print("" in string)             # True
print("XXX" in string)          # False
print("XXX" not in string)      # True

my_list = [1, 2, 3]
print(3 in my_list)             # True
print(6 in my_list)             # False
print(6 not in my_list)         # True

my_dict = {"a": 1, "b": 2, "c": 3}
print("a" in my_dict)           # True
print("d" not in my_dict)       # True
```

## 身份运算符

> Identity Operators

| 运算符   | 说明                           |
| -------- | ------------------------------ |
| `is`     | 两个变量指向内存中的同一个对象 |
| `is not` | 两个变量指向内存中的不同对象   |

主要用于替代`==`来判断单例对象`None`、`True`、`False`

```py
x = None
y = True
z = False

if x is None:
    pass

if y is True:
    pass

if z is not False:
    pass
```
