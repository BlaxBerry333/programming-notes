---
prev: false
next: false
---

# Python

![](/static/skill-images/web-backend--python.png)

Python 是一种解释型语言，文件后缀名是`.py`

## 下载安装

::: code-group

```zsh [asdf]
# 1. 下载 asdf 插件与 python 的版本
% asdf plugin add python
% asdf install python [版本]

# 2. 设置全局环境下的版本
% asdf global python [版本]
% asdf reshim python
```

:::

> 如下：本文使用 Python v3.10.0

```zsh
% python --version         # [!code focus]
Python 3.10.0
```

## 代码执行

Python 代码不需编译便可执行

```zsh
% python [脚本文件].py
```

## 书写规范

- 文件名使用使用小写蛇形命名 ( snake_case )
- 使用换行来分隔每个语句，一行建议仅书写一条语句
- 使用缩进来定义代码块，每一级缩进使用 4 个空格 ( 不建议使用 Tab )

```py
def main():
    print("Hello World!")


if __name__ == "__main__":
    main()
```

> [!IMPORTANT] 代码风格
> 建议使用第三方工具 [black](https://black.readthedocs.io/en/stable/getting_started.html) 来统一代码的风格
>
> ::: code-group
>
> ```zsh [依赖包]
> # 0. 开启并进入虚拟环境
> % python -m venv 虚拟环境
> % source 虚拟环境/bin/active
>
> # 1. 下载依赖包
> (虚拟环境) % pip install black
>
> # 2. 执行命令，格式化当前目录下的所有文件
> (虚拟环境) % python black .
> ```
>
> ```toml [pyproject.toml 插件配置]
> [tool.black]
> line-length = 80  # 设置一行最大数字符数
> target-version = ["py39", "py310"]
> include = '\.pyi?$'
> exclude = '''
> /(
>     \.eggs
>   | \.git
>   | \.hg
>   | \.mypy_cache
>   | \.tox
>   | \.venv
>   | _build
>   | buck-out
>   | build
>   | dist
>   | migrations
> )/
> '''
> ```
>
> ```json [VSCode 插件配置]
> {
>   "[python]": {
>     "editor.defaultFormatter": "ms-python.black-formatter",
>     "editor.formatOnSave": true
>   },
>   "python.formatting.provider": "black",
>   "black-formatter.args": ["--line-length=80" /* 设置一行最大数字符数 */]
> }
> ```
>
> :::

## 相关链接

[Python从入门到精通](https://www.bilibili.com/video/BV1qK411n7gQ?spm_id_from=333.788.videopod.episodes&vd_source=8960252a3845b76b699282b11f36ab5c)
