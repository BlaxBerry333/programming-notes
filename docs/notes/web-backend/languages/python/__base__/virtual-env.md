# Python 虚拟环境

> Virtual Environment

Python 强烈建议使用虚拟环境来隔离全局环境与工作区中应用程序的环境

在虚拟环境中安装的第三方依赖包不会影响到全局环境以及其他工作区环境

> [!IMPORTANT] 虚拟环境 vs Docker
>
> - Docker 容器更倾向于隔离整个应用程序的执行环境，以实现开发与部署的一致性
> - Python 虚拟环境更倾向于隔离项目中的第三方包的依赖关系，以避免对全局环境的污染

## venv

venv 是 Python 的标准库中的模块，开箱即用无需下载

---

### 常用命令

```zsh
% cd [项目名]

# 1. 创建虚拟环境
% python -m venv [虚拟环境名]

# 2. 激活虚拟环境
% source [虚拟环境名]/bin/activate
(虚拟环境名) % # ...
(虚拟环境名) % pip install [第三方包]
(虚拟环境名) % freeze > requirements.txt

# 3. 退出虚拟环境
(虚拟环境名) % deactivate
```

::: details 例子：用名为`.venv`的虚拟环境验证安装的依赖包与全局环境隔离

```zsh
% mkdrir sample_project && cd sample_project

% python -m venv .venv
% source .venv/bin/activate
(.venv) % pip install django
(.venv) % pip show  django | grep Version           # [!code hl:2]
Version: 4.2.16
(.venv) % deactivate

% pip show django | grep Version                    # [!code hl:2]
WARNING: Package(s) not found: django
```

:::

---

### 目录结构

::: code-group

```[项目目录]
[项目目录]
├─ ...
└─ [虚拟环境]/
    ├─ bin/
    │   ├─ activate
    │   ├─ deactivate
    │   ├─ pip
    │   ├─ python
    │   └─ ...
    │
    ├─ include/
    │
    ├─ lib/
    │   └─ [Python版本]
    │       └─ site-package
    │           ├─ [下载在虚拟环境中的包]
    │           ├─ [下载在虚拟环境中的包]
    │           └─ ...
    │
    └─ pyvenv.cfg
```

:::

::: code-group

```[pyvenv.cfg]
home = [Python解析器路径]
version = [Python版本]
include-system-site-packages = false
```

:::
