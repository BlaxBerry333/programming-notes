---
prev: false
next: false
---

# asdf

![](/static/skill-images/dev-tools--asdf.png)

asdf 是一个可以同时管理多个语言、运行时的版本管理工具

## 下载安装

::: code-group

```zsh [Homebrew]
# 1. 下载安装前提依赖项
% brew install coreutils curl git

# 2. 下载安装 asdf
% brew install asdf

# 3. 追加环境变量到 ~/.zshrc 文件
% echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ${ZDOTDIR:-~}/.zshrc
```

:::

## 目录结构

asdf 通过一个版本管理文件`.tool-versions`控制当前工作区目录下的各个语言与运行时的版本

该文件在执行命令版本切换版本时会自动更新

::: code-group

```[目录结构]
[全局目录]
│
├─ [工作区目录]/
│   ├─ .tool-versions
│   └─ ...
│
├─ [工作区目录]/
│   ├─ [项目目录]/
│   │   ├─ .tool-versions
│   │   └─ ...
│   ├─ [项目目录]/
│   │   ├─ .tool-versions
│   │   └─ ...
│   ├─ .tool-versions
│   └─ ...
│
├─ .tool-versions
└─ ...
```

:::

## 常用命令

### 下载语言/运行时

```zsh
# 1. 安装语言/运行时的插件
% asdf plugin add [插件]

# 2. 安装语言/运行时的具体版本
% asdf install [语言/运行时] [版本]
```

下载前建议先查看所有可以安装的版本

```zsh
% asdf list all [语言/运行时]
```

::: details 例子：下载 Node.js、Python、Golang

```zsh
% asdf plugin add nodejs
% asdf plugin add python
% asdf plugin add golang

% asdf install nodejs 18.18.0
% asdf install python 3.10.0
% asdf install golang 1.18
```

:::

---

### 卸载语言/运行时

```zsh
% asdf uninstall [语言/运行时] [版本]
```

---

### 设置版本

::: code-group

```zsh [全局环境]
% asdf global [语言/运行时] [版本]
% asdf reshim [语言/运行时]
```

```zsh [本地环境]
% cd [工作区目录]
% asdf local [语言/运行时] [版本]
% asdf reshim [语言/运行时]
```

:::

> [!IMPORTANT] <code>asdf reshim</code>
> 设置版本后需要执行该命令来更新 shim，确保其指向新的版本，否则系统可能仍然使用旧版本

---

### 查看版本

::: code-group

```zsh{0} [所有安装的]
% asdf list                     # [!code focus]
语言/运行时
  版本
 *版本
  版本
语言/运行时
  版本
  版本
 *版本
```

```zsh{0} [当前工作区]
% cd [工作区目录]                 # [!code focus:2]
% asdf current
语言/运行时       版本             /Users/用户/路径/.tool-versions
语言/运行时       版本             /Users/用户/路径/.tool-versions
语言/运行时       版本             /Users/用户/路径/.tool-versions
```

:::

### 链接更新

asdf 管理的语言或运行时版本变更、或者其管理的插件依赖包更新时，必须更新 shim

若不更新 shim 会导致无法指向正确的版本与路径

```zsh
% asdf reshim [语言/运行时]
```

::: details 例子：asdf 管理的 Node.js 通过 NPM 全局下载脚本工具

```zsh
% npm install -g @google/gemini-cli
% gemini --version
gemini not found                        # [!code error]

% asdf reshim nodejs
% gemini --version
0.1.14
```

:::
