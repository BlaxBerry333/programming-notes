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
# 1. 下载 asdf 插件与的版本                                                 // [!code focus:10]
% asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
% asdf install nodejs [版本]

# 2. 设置全局环境下的版本
% asdf global nodejs [版本]
% asdf reshim nodejs

# 3. 检查安装的版本
% node --version
v22.0.0
```

:::
