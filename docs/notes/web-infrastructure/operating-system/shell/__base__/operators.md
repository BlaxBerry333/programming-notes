# Shell 运算符

## 比较运算符

| 运算符 | 说明             | 例子                              |
| ------ | ---------------- | --------------------------------- |
| -gt    | 左侧大于右侧     | `[ $a -gt $b ]` 或 `(( a > b ))`  |
| -lt    | 左侧小于右侧     | `[ $a -lt $b ]` 或 `(( a < b ))`  |
| -ge    | 左侧大于等于右侧 | `[ $a -ge $b ]` 或 `(( a >= b ))` |
| -le    | 左侧小于等于右侧 | `[ $a -le $b ]` 或 `(( a <= b ))` |
| -eq    | 左侧等于右侧     | `[ $a -eq $b ]` 或 `(( a == b ))` |
| -ne    | 左侧不等于右侧   | `[ $a -ne $b ]` 或 `(( a != b ))` |

<!-- ## 表达式

```sh
$((表达式))
```

```bash
$ a=10+20                           # [!code --:2]
$ echo $a               # 10+20
$ echo $((10 + 20))     # 30        # [!code ++:2]
$ echo `expr 10 + 20`   # 30
```

## 算数运算

```sh
echo `expr 10 + 20`   # 30
echo $((10 + 20))     # 30
``` -->
