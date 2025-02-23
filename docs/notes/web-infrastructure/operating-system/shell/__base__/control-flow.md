# Shell 流程控制

## 条件判断

### if...then...fi

::: code-group

```sh [脚本文件]
#!/bin/bash

if [ 条件 ]; then
  # ...
fi
```

:::

::: details 例子

::: code-group

```bash [命令式]
$ echo '
#!/bin/bash                     # [!code hl:12]

a=10
b=20

if [ $a -lt $b ]; then
    echo "a<b"
fi

if (( a < b )); then
    echo "a<b"
fi
' > xxxx.sh

$ bash xxxx.sh
a<b
a<b
```

```sh [脚本文件]
#!/bin/bash

a=10
b=20

if [ $a -lt $b ]; then
    echo "a<b"
fi

if (( a < b )); then
    echo "a<b"
fi
```

:::

---

### if...then...else...fi

::: code-group

```sh [脚本文件]
#!/bin/bash

if [ 条件 ]; then
  # ...
else
  # ...
fi
```

:::

---

### if...then...elif...then...fi

::: code-group

```sh [脚本文件]
#!/bin/bash

if [ 条件1 ]; then
  # ...
elif [ 条件2 ]; then
  # ...
fi
```

:::

---

### case...in...esac

::: code-group

```sh [脚本文件]
#!/bin/bash

case $变量 in
  "值1" ）
    # ...
    ;;
  "值2" ）
    # ...
    ;;
  * ）
    # ...
    ;;
esac
```

:::

::: details 例子

::: code-group

```bash [命令式]
$ echo '
#!/bin/bash                     # [!code hl:14]

read -p "请输入 ( yes/no ) " answer

case $answer in
  "yes")
    echo "aaaa"
    ;;
  "no")
    echo "bbbb"
    ;;
  *)
    echo "cccc"
esac
' > xxxx.sh

$ bash xxxx.sh
请输入( yes/no ) yes
aaaa
$ bash xxxx.sh
请输入( yes/no ) no
bbbb
$ bash xxxx.sh
请输入( yes/no ) xxx
cccc
```

```sh [脚本文件]
#!/bin/bash

read -p "请输入 ( yes/no ) " answer

case $answer in
  "yes")
    echo "aaaaa"
    ;;
  "no")
    echo "bbbb"
    ;;
  *)
    echo "cccc"
esac
```

:::

## 循环遍历

### for...do...done

::: code-group

```sh [写法一]
#!/bin/bash

for (( 循环计时器变量 = 初始值; 判断循环计时器; 更新循环计时器 ))
  do
    # ...
  done
```

```sh [写法二]
#!/bin/bash

for (( 循环计时器变量 = 初始值; 判断循环计时器; 更新循环计时器 )); do
  # ...
done
```

:::

::: details 例子

::: code-group

```bash [命令式]
$ echo '
#!/bin/bash                     # [!code hl:5]

for ((i=0; i<=$#; i++)); do
  echo $i ${!i}
done
' > xxxx.sh

$ bash xxxx.sh 10 20 30
0 111.sh
1 10
2 20
3 30
```

```sh [脚本文件]
#!/bin/bash

for ((i=0; i<=$#; i++)); do
  echo $i ${!i}
done
```

:::

---

### fot...in...

::: code-group

```sh [写法一]
#!/bin/bash

for 变量 in 序列
  do
    echo $i ${!i}
  done
```

```sh [写法二]
#!/bin/bash

for 变量 in 序列; do
  echo $i ${!i}
done
```

:::

::: details 例子

::: code-group

```sh [脚本文件]
#!/bin/bash

for filename in `ls`; do
  echo $filename
done
```

:::

---

### while...do...done

::: code-group

```sh [写法一]
#!/bin/bash

while [ 条件 ];
  do
    # ...
  done
```

```sh [写法二]
#!/bin/bash

while [ 条件 ]; do
  # ...
done
```

:::

> [!CAUTION] 避免死循环
>
> 为了避免出现重复不停的死循环，建议使用一个循环计控制器变量并将其作为循环的判断条件
>
> ```sh
> #!/bin/bash
>
> 循环计控制器变量=初始值
>
> while [ 条件 ]; do
>   # ...
>   # 更新循环计时器变量
> done
> ```

::: details 例子

::: code-group

```bash [命令式]
$ echo '
#!/bin/bash                     # [!code hl:8]

num=1

while (( num <= 5 )); do
  echo $num
  (( num++ ))
done
' > xxxx.sh

$ bash xxxx.sh
1
2
3
4
5
```

```sh [脚本文件]
#!/bin/bash

num=1

while (( num <= 5 )); do
  echo $num
  (( num++ ))
done
```

:::
