---
prev: false
next: false
---

# Node.js

![](/static/skill-images/web-backend--nodejs.png)

Node.js 是一种 JavaScript 的运行时环境

## 下载安装

::: code-group

```zsh [asdf + Node.js]
# 1. 下载 asdf 插件与 node.js 的版本
% asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
% asdf install nodejs [版本]

# 2. 设置全局环境下的版本
% asdf global nodejs [版本]
% asdf reshim nodejs

# 3. 检查安装的版本

```

:::

> 如下：本文使用 Node.js v22.0.0

```zsh
% node --version         # [!code focus]
v22.0.0
```

## 相关链接

- [Nodejs + Redis 缓存策略](https://www.bilibili.com/video/BV16hyNYAEw6?spm_id_from=333.788.player.switch&vd_source=8960252a3845b76b699282b11f36ab5c)
