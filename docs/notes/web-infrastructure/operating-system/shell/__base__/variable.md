# Shell 变量

## 定义

### 自定义变量

自定义变量的定义不使用关键字

变量名使用小写蛇形命名 ( snake_case )

变量值默认都是字符串类型，若含有空格则需要使用引号包裹

::: code-group

```bash [命令式]
$ 普通变量1=值
$ 普通变量1=新值

$ readonly 只读变量=值
```

```sh [脚本文件]
#!/bin/bash

普通变量1=值
普通变量1=新值

readonly 只读变量=值
```

:::

::: details 例子：验证自定义变量的创建与更新

::: code-group

```bash [命令式]
$ a=10
$ echo $a
$ a="hello world"
$ echo $a
10
hello world
```

```sh [脚本文件]
#!/bin/bash

a=10
echo $a
a="hello world"
echo $a
```

:::

---

### 环境变量

自定义环境变量的定义使用关键字`export`

变量名使用大写蛇形命名 ( snake_case )

变量值默认都是字符串类型，若含有空格则需要使用引号包裹

::: code-group

```bash [命令式]
$ export 环境变量1=值
$ export 环境变量2=值
```

```sh [脚本文件]
#!/bin/bash

export 环境变量1=值
export 环境变量2=值
```

:::

::: details 例子：将脚本文件中的自定义环境变量导出时需要通过`source`执行文件

```bash [脚本文件]
$ echo '
#!/bin/bash                    # [!code hl:4]

$ export 环境变量1=值
$ export 环境变量2=值
' > 脚本文件.sh

$ bash 脚本文件.sh              # [!code --]
$ source 脚本文件.sh            # [!code ++]
```

:::

## 使用

### &#36;变量

::: code-group

```bash [脚本文件]
#!/bin/bash

变量1=值
变量2=$变量1

echo $变量1 $变量2
```

:::

---

### &#36;(&nbsp;)

`$( )`可用于将一个命令的返回值作为一个变量的值

::: code-group

```sh [脚本文件]
#!/bin/bash

变量=$(命令)
```

:::

::: details 例子：

```bash
$ files=$(ls)
$ echo $files
afs bin dev etc home lib lib64 media mnt opt proc root run sbin srv sys tmp usr var
```

:::

---

### ((&nbsp;))

`(( ))`可用于执行算术运算、比较运算

其中的变量不需要通过`$`引用

::: code-group

```sh [脚本文件]
#!/bin/bash

(( 算数运算 ))
(( 比较运算 ))
```

:::

::: details 例子：

::: code-group

```bash [命令式]
$ a=10
$ (( a++ ))
$ echo $a
11
```

```sh [脚本文件]
#!/bin/bash

a=10
(( a++ ))
echo $a
```

:::

---

### &#36;((&nbsp;))

`$(( ))`可用于执行算术运算的返回值作为一个变量的值

其中的变量不需要通过`$`引用，作用等同于`expr 算数运算`

::: code-group

```sh [脚本文件]
#!/bin/bash

变量1=$(( 算数运算 ))

变量2=`expr 算数运算`
```

:::

::: details 例子：

::: code-group

```bash [命令式]
$ a=10
$ b=$(( a * 10 ))
$ echo $b
110
$ b=`expr $b / 10`
$ echo $b
11
```

```sh [脚本文件]
#!/bin/bash

a=10

b=$(( a * 10 ))
echo $b

b=`expr $b / 10`
echo $b
```

:::

---

### [&nbsp;]

`[ ]`可用于作为条件

---

### [[&nbsp;]]

`[[ ]]`可用于作为条件

## 特殊变量

### &#36;n

变量`$n`可用于获取脚本接收的第`n`个参数的值

::: code-group

```bash [命令式]
$ echo $序号      # 当前脚本文件接收的指定序号位置的参数的值
$ echo $0        # 当前执行的进程名
```

:::

::: details 例子：验证特殊变量`$1`、`$2`的值

::: code-group

```bash [命令式]
$ echo '
#!/bin/bash                     # [!code hl:3]

echo $1 $2
' > xxxx.sh

$ bash xxxx.sh 100 200
100 200
```

```sh [脚本文件]
#!/bin/bash

echo $1 $2
```

:::

::: details 例子：验证特殊变量`$0`的值

```bash
$ echo '
#!/bin/bash                     # [!code hl:3]

echo $0
' > xxxx.sh

$ bash xxxx.sh
xxxx.sh

$ echo $0
/bin/sh
```

:::

---

### &#36;&#35;

变量`$#`可用于获取脚本接收的所有的参数的个数

::: code-group

```bash [命令式]
$ echo $#
```

:::

::: details 例子：利用`for`循环与特殊变量`$#`打印接收的所有参数

::: code-group

```bash [命令式]
$ echo '
#!/bin/bash                     # [!code hl:7]

echo $#

for ((i=1; i<=$#; i++)); do
  echo "$i: ${!i}"
done
' > xxxx.sh

$ bash xxxx.sh 100 200 300
1: 100
2: 200
3: 300
```

```sh [脚本文件]
#!/bin/bash

echo $#

for ((i=1; i<=$#; i++)); do
  echo "$i: ${!i}"
done
```

:::

---

### &#36;&#64;

变量`$@`可用于将脚本接收所有的参数转为一个字符串列表，可用于循环遍历

::: code-group

```bash [命令式]
$ echo $@
```

:::

::: details 例子：利用`for`循环与特殊变量`$@`打印接收的所有参数

::: code-group

```bash [命令式]
$ echo '
#!/bin/bash                     # [!code hl:7]

echo $@

for arg in "$@"; do
  echo "${arg}"
done
' > xxxx.sh

$ bash xxxx.sh 100 200 300
100 200 300
100
200
300
```

```sh [脚本文件]
#!/bin/bash

echo $@

for arg in "$@"; do
  echo "${arg}"
done
```

:::

---

### &#36;\*

变量`$*`可用于将脚本接收所有的参数转为一个字符串，并以空格间隔各个参数

::: code-group

```bash [命令式]
$ echo $*
```

:::

::: details 例子：利用`for`循环验证特殊变量`$@`的值无法用于遍历

::: code-group

```bash [命令式]
$ echo '
#!/bin/bash                     # [!code hl:7]

echo $*

for arg in "$*"; do
  echo "${arg}"
done
' > xxxx.sh

$ bash xxxx.sh 100 200 300
100 200 300
100 200 300
```

```sh [脚本文件]
#!/bin/bash

echo $*

for arg in "$*"; do
  echo "${arg}"
done
```

:::

---

### &#36;?

变量`$*`可用于获取最近一次命令的执行状态

返回值为`0`时表明最近一次命令成功执行

::: code-group

```bash [命令式]
$ echo $?
```

:::
