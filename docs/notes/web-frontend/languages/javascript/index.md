---
prev: false
next: false
---

# JavaScript

![](/static/skill-images/web-frontend--javascript.png)

JavaScript 是一种解释型语言，文件后缀名为`.js`、`.jsx`

## 下载安装

JavaScript 是浏览器的内置脚本语言，无需单独下载安装便可以直接在浏览器中运行

但是离开了浏览器时则需要借助 Node.js、Deno 等运行时环境

::: code-group

```zsh [asdf + Node.js]
# 1. 下载 asdf 插件与 node.js 的版本                                                 // [!code focus:10]
% asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
% asdf install nodejs [版本]

# 2. 设置全局环境下的版本
% asdf global nodejs [版本]
% asdf reshim nodejs

# 3. 检查安装的版本
% node --version
v22.0.0
```

```zsh [asdf + Deno]
# 1. 下载 asdf 插件与 deno 的版本                                                 // [!code focus:10]
% asdf plugin add deno https://github.com/asdf-community/asdf-deno.git
% asdf install deno [版本]

# 2. 设置全局环境下的版本
% asdf global deno [版本]
% asdf reshim deno

# 3. 检查安装的版本
% deno --version
deno 2.1.0 (stable, release, aarch64-apple-darwin)
v8 13.0.245.12-rusty
typescript 5.6.2
```

:::

## 代码执行

JavaScript 代码不需编译便可执行在浏览器环境、非浏览器的运行时环境

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
% node [脚本文件].js

# Deno 运行时环境
% deno [脚本文件].js
```

:::

<!-- |            浏览器环境            | 说明                                                                                                      |
| :------------------------------: | --------------------------------------------------------------------------------------------------------- |
|  行内脚本<br/>( Inline Script )  | 直接编写在 HTML 中的`<script>`标签内<br/>页面加载时立即执行代码                                           |
| 外部脚本<br/>( External Script ) | 通过`<script>`标签的`src`属性引入外部`.js`文件<br/>页面加载时通过 HTTP 请求加载，加载完成后执行文件中代码 | -->

## 书写规范

- 使用分号`;`来分隔每个语句，一行建议仅书写一条语句
- 使用大括号`{ }`来定义代码块，每一级缩进 2 或 4 个空格

```js
function main() {
  console.log("Hello World!");
}

main();
```

> [!IMPORTANT] 代码风格
> 建议使用第三方工具 [prettier](https://prettier.io/docs/en/install) 来统一代码的风格
>
> ::: code-group
>
> ```zsh [依赖包]
> # 1. 下载依赖包
> % npm install -D prettier
>
> # 2. 创建基础配置文件
> node --eval "fs.writeFileSync('.prettierrc','{}\n')"
> node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
>
> # 2. 执行命令，格式化当前目录下的所有文件并使用缓存文件优化加载速度
> % npm run prettier . --write --cache --cache-location=./.cache/.prettiercache
> ```
>
> ```json{0} [VSCode 插件配置]
> {
>   "editor.formatOnSave": true,                          // [!code ++:2]
>   "editor.defaultFormatter": "esbenp.prettier-vscode"
> }
> ```
>
> ```json [.prettierrc 配置]
> {
>   "printWidth": 100 /* 设置一行最大数字符数 */,
>   "plugins": [
>     "prettier-plugin-organize-imports" /* 自动整理和排序 import 语句 */,
>     "prettier-plugin-css-order" /* 自动排序 CSS 文件中的属性*/
>   ]
> }
> ```
>
> :::
