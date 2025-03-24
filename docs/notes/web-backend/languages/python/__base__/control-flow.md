# Python 流程控制

## 条件分支

### if...

```py
if 条件:
    # ...
```

---

### if...else...

```py
if 条件:
    # ...
else:
    # ...
```

---

### if...elif...

```py
if 条件1:
    # ...
elif 条件2:
    # ...
elif 条件3:
    # ...
```

---

### if...elif...else...

```py
if 条件1:
    # ...
elif 条件2:
    # ...
elif 条件3:
    # ...
else:
    # ...
```

## 循环分支

### for...in...

```py
for 变量 in 可遍历对象:
    # ...
    # 变量迭代
```

> 如下：

::: code-group

```py [字符串]
s = "1234"

for char in s:
    print(char)
```

```py [列表]
l = [1, 2, 3]

for element in l:
    print(element)
```

```py [字典]
d = {"a": 1, "b": 2}

for key in d:                   # [!code --:2]
    print(key, d[key])

for key, value in d.items():    # [!code ++:2]
    print(key, value)
```

:::

---

### for...in...else...

```py
for 变量 in 可遍历对象:
    # ...
    # 变量迭代
else:
    # 当前 for 循环完全结束后执行...
```

---

### for...in range( )

```py
# 生成从 0 到 数值-1 的整数序列
for 变量 in range(数值)
    # ...

# 生成从 开始数值 到 结束数值-1 的整数序列
for 变量 in range(开始数值, 结束数值)
    # ...

# 生成从 开始数值 到 结束数值-1 的整数序列，且间隔步长
for 变量 in range(开始数值, 结束数值, 间隔步长)
    # ...
```

::: details 例子：打印九九乘法表

```py
for x in range(1, 10):
    for y in range(1, x + 1):
        print(f"{x} * {y} = {x*y}", end="\t")
    else:
        print("")


# 1 * 1 = 1
# 1 * 2 = 2   2 * 2 = 4
# 1 * 3 = 3   2 * 3 = 6   3 * 3 = 9
# 1 * 4 = 4   2 * 4 = 8   3 * 4 = 12   4 * 4 = 16
# 1 * 5 = 5   2 * 5 = 10   3 * 5 = 15   4 * 5 = 20   5 * 5 = 25
# 1 * 6 = 6   2 * 6 = 12   3 * 6 = 18   4 * 6 = 24   5 * 6 = 30   6 * 6 = 36
# 1 * 7 = 7   2 * 7 = 14   3 * 7 = 21   4 * 7 = 28   5 * 7 = 35   6 * 7 = 42   7 * 7 = 49
# 1 * 8 = 8   2 * 8 = 16   3 * 8 = 24   4 * 8 = 32   5 * 8 = 40   6 * 8 = 48   7 * 8 = 56   8 * 8 = 64
# 1 * 9 = 9   2 * 9 = 18   3 * 9 = 27   4 * 9 = 36   5 * 9 = 45   6 * 9 = 54   7 * 9 = 63   8 * 9 = 72   9 * 9 = 81
```

:::

---

### while...

```py
while 条件:
    # ...
    # 中止条件的变量迭代
```

::: details 例子：遍历打印 10 次

```py
num = 0

while num < 10:
    print(num)
    num += 1
```

:::

---

### 关键字 break

用于直接结束所处的最近的一个循环语句，不再执行剩余的其他循环

> 如下：在满足`i==2`时直接结束整个循环语句

```py{0}
for num in range(1, 5):
    if num == 2:
        break                       # [!code hl]
    print(num)


# 1
```

---

### 关键字 continue

用于中断所处的当前次数循环体，直接进入下一次后续的循环

> 如下：循环语句仅在满足`i==2`时不执行

```py{0}
for num in range(1, 5):
    if num == 2:
        continue                    # [!code hl]
    print(num)


# 1
# 3
# 4
```

## 异常处理

### try...except...

可用于捕获异常

```py
try:
    # ...
except 异常类型1:
    # ...
except 异常类型2 as 别名:
    # ...
except 异常类型3 as 别名:
    # ...
except:
    # ...
```

---

### try...except...finally...

可用于捕获异常

```py
try:
    # ...
except 异常类型1:
    # ...
except 异常类型2 as 别名:
    # ...
except 异常类型3 as 别名:
    # ...
except:
    # ...
finally:
    # ...
```

---

### raise

可用于实现抛出异常

```py
raise 异常类型
raise 异常类型("自定义信息")
```

::: details 例子：抛出一个内置异常类型

```py
def divide(x, y):
    if y == 0:
        raise ZeroDivisionError("y cannot be 0")  # [!code hl]
    else:
        return x / y
```

:::

::: details 例子：抛出一个自定义异常类型

```py
class MyErrorType(Exception):
    pass


def my_func(a, b):
    if a < b:
        raise MyErrorType("xxx")    # [!code hl]
    print("yyy")


def run(a, b):
    try:                            # [!code hl:4]
        my_func(a, b)
    except MyErrorType as error:
        print(error)


run(1, 2)   # xxx
run(2, 1)   # yyy
```

:::
