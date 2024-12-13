---
prev: false
next: false
---

# JavaScript

![](/static/skill-images/web-frontend--javascript.png)

JavaScript 是一种解释型语言，文件后缀名为`.js`、`.jsx`

## 下载安装

JavaScript 是浏览器的内置脚本语言，无需单独下载安装可以直接在浏览器中运行

但是离开了浏览器时则需要借助 Node.js、Deno 等运行时环境

::: code-group

```zsh [asdf + Node.js]
# 1. 下载 asdf 插件与的版本
% asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
% asdf install nodejs [版本]

# 2. 设置全局环境下的版本
% asdf global nodejs [版本]
% asdf reshim nodejs
```

```zsh [asdf + Deno]
# 1. 下载 asdf 插件与的版本
% asdf plugin add deno https://github.com/asdf-community/asdf-deno.git
% asdf install deno [版本]

# 2. 设置全局环境下的版本
% asdf global deno [版本]
% asdf reshim deno
```

:::

## 代码执行

JavaScript 代码不需编译可执行在浏览器环境、非浏览器的运行时环境

::: code-group

```html{0} [浏览器环境]
<!doctype html>
<html lang="en">
  <head>
    <script src="脚本文件.js"></script>      // [!code focus]
  </head>
  <body>
    <script>                               // [!code focus:3]
      // ...
    </script>
    <script src="脚本文件.js"></script>     // [!code focus]
  </body>
</html>
```

```zsh [非浏览器的运行时环境]
# Node.js 运行时环境
% node 脚本文件.js

# Deno 运行时环境
% deno 脚本文件.js
```

:::

<!-- |            浏览器环境            | 说明                                                                                                      |
| :------------------------------: | --------------------------------------------------------------------------------------------------------- |
|  行内脚本<br/>( Inline Script )  | 直接编写在 HTML 中的`<script>`标签内<br/>页面加载时立即执行代码                                           |
| 外部脚本<br/>( External Script ) | 通过`<script>`标签的`src`属性引入外部`.js`文件<br/>页面加载时通过 HTTP 请求加载，加载完成后执行文件中代码 | -->
