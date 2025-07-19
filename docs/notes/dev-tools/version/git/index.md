---
prev: false
next: false
---

# Git

![](/static/skill-images/dev-tools--git.png)

## 下载安装

::: code-group

```zsh [Homebrew]
% brew install git
```

:::

> 如下：本文使用的 Git v2.39.2

```zsh
% git --version      # [!code focus]
git version 2.39.2 (Apple Git-143)
```

## 基本配置

```zsh
# 全局配置用户信息
% git config --global user.name [用户名]
% git config --global user.name [用户邮箱]

# 保持大小写敏感
% git config core.ignorecase false
```

## 目录结构

::: code-group

```[目录结构]
[项目目录]
├─ ...
├─ .gitattributes
├─ .gitignore
└─ .git/
    ├─ hooks/
    ├─ config
    └─ ...
```

```[.gitignore]
# 忽略所有后缀为 a 的文件
*.a

# 但不忽略名为 xxx.a 的文件
!xxx.a

# 忽略所有目录下的 XX 目录
XX/

# 仅忽略 .gitignore 同级目录下的 YY 目录 (不忽略 AA/YY, BB/YY)
/YY

# 忽略 AA 目录及其所有子目录后缀为 .txt 的文件
AA/**/*.txt

# 仅忽略 AA 目录当前目录下所有后缀为 .txt 的文件 (不忽略 AA/BB/*.txt, AA/CC/*.txt)
AA/*.txt
```

:::

## 常用命令

<!-- ### 本地分支

---

### 远程仓库

---

### 更改提交信息

--- -->

### 临时保存

```zsh
# 临时保存
% git stash save [名称]

# 列出所有的临时记录
% git stash list

# 恢复到最近的一个并删除临时记录
% git stash pop

# 恢复到指定的临时记录
% git stash pop [stash@{N}]
```

### 合并提交记录

```zsh
# 以交互式合并最近的 N 个提交
% git rebase -i HEAD~N

# 取消合并
git rebase --abort
```

```
pick 提交ID 提交信息
pick 提交ID 提交信息      # [!code --]
squash 提交ID 提交信息    # [!code ++]
pick 提交ID 提交信息      # [!code --]
squash 提交ID 提交信息    # [!code ++]

-- INSERT --
```

- `pick`：保留该提交
- `squash`：合并该提交到前一个提交，并且合并提交信息
- `reword`：修改该提交信息，但不改变内容
- `drop`：删除该提交
