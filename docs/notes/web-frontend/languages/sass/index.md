---
prev: false
next: false
---

# Sass

![](/static/skill-images/web-frontend--sass.png)

Sass 是一种 CSS 预处理器，文件后缀名是`.sass`、`.scss`

最终需编译为 CSS 后才能被浏览器识别

## 下载安装

```zsh
% cd [项目目录]

# Vite 项目
% npm install -D sass

# Webpack 项目
% npm install -D sass-loader css-loader style-loader
```

## 基本使用

Sass 提供两种语法：SCSS、Sass

|                           语法                           | 说明                                 |
| :------------------------------------------------------: | ------------------------------------ |
|            SCSS 花括号语法<br/>( Sassy CSS )             | 文件后缀名是`.scss` ( 广泛用于前端 ) |
| Sass 缩进语法<br/>( Syntactically Awesome Style Sheets ) | 文件后缀名是`.sass`                  |

::: code-group

```scss [SCSS 语法]
$primary-color: #007bff;

body {
  color: $primary-color;

  div {
    background-color: $primary-color;

    p {
      font-size: 16px;
    }
  }
}
```

```sass [Sass 语法]
$primary-color: #007bff

body
  color: $primary-color

  div
    background-color: $primary-color

    p
      font-size: 16px
```

:::

---

### 注释

- 单行注释定义在`//`之后
- 多行注释定义在`/* */`之间

::: code-group

```scss [单行注释]
// 单行注释
// 单行注释
// 单行注释
```

```scss [多行注释]
/*
 * 多行注释
 * 多行注释
 */
```

:::

> [!IMPORTANT] 单行注释 VS 多行注释
>
> - SCSS 的单行注释: 编译为 CSS 文件会被移除
> - SCSS 的多行注释: 会被保留到编译后的 CSS 文件中

---

### 变量

- 变量名使用`$`
- 变量名使用字符命名法 ( kebab-case )
- 变量值可以是任何 CSS 属性值 ( 包括颜色、字体、尺寸等 )

```scss
$变量1: 值;
$变量2: 值;

选择器 {
  属性: $变量1;
  属性: $变量2;
}
```

::: details 例子：

```scss
$primary-color: #007bff;
$font-size-base: 16px;
$line-height-base: 1.5;

p {
  color: $primary-color;
  font-size: $font-size-base;
  line-height: $line-height-base;
}
```

:::

---

### 嵌套

- 在父选择器中可以直接嵌套子选择器
- 在当前选择器中可以使用`&`表示当前选择器

```scss
父选择器 {
  // ...

  子选择器 {
    //...
  }

  &: 伪类选择器 {
    // ...
  }

  &::伪元素选择器 {
    // ...
  }
}
```

::: details 例子：

```scss
$spacing-base: 16px;
$color-primary: #007bff;
$color-bg: #fff;
$transition-base: all 0.3s ease;

.container {
  display: flex;
  padding: $spacing-base;

  .item {
    flex: 1;
    margin: $spacing-base;
    background-color: $color-bg;
    transition: $transition-base;

    &:hover {
      transform: translateY(-2px);
    }

    &:first-child {
      margin-left: 0;
    }

    &:nth-child(2) {
      background-color: darken($color-bg, 5%);
    }

    &::after {
      content: "";
      display: block;
      background-color: $color-primary;
    }
  }
}
```

:::

---

### 导入

- 使用`@use`导入其他的文件 ( SCSS、Sass、CSS )
- 也可使用`@import`但是已经逐渐被废弃

```scss
@use "文件名";
@use "文件名" as "别名";

选择器 {
  属性: 别名.变量名;
  属性: 别名.函数名(参数);
  属性: 别名.混合器名(参数);
  属性: 别名.工具类名;
}
```

::: details 例子：

```scss
// 基础导入
@use "variables";

// 使用命名空间
@use "variables" as v;
@use "mixins" as *; // 使用所有导出

.button {
  color: v.$primary-color;
  padding: $spacing-base;
}
```

:::

---

### 继承

- 继承用于复用完全相同的样式代码
- 若想定义一个仅用于被继承的选择器时可使用`%`定义
- 使用`@extend`继承其他选择器的样式

```scss
选择器1 {
  //...
}

%选择器2 {
  //...
}

子选择器 {
  @extend 选择器1, %选择器2;
  //...
}
```

::: details 例子：

```scss
.button {
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}

.button-primary {
  @extend .button;
  background-color: #007bff;
  font-size: 16px;
}

.button-secondary {
  @extend .button;
  background-color: #6c757d;
  font-size: 14px;
}
```

:::

---

### 混合

- 混合用于复用部分相同的样式代码，并支持参数传递动态生成不同样式
- 使用`@mixin`定义一个混合器
- 使用`@include`调用一个混合器

```scss
@mixin 混合器名(参数) {
  //...
}

选择器 {
  @include 混合器名(参数);
  //...
}
```

::: details 例子：

```scss
@mixin button($color, $size) {
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: $color;
  font-size: $size;
}

.button-primary {
  @include button(#007bff, 16px);
}

.button-secondary {
  @include button(#6c757d, 14px);
}
```

:::

---

### 函数

- 自定义函数使用`@function`定义，并使用`@return`返回一个值
- Sass 提供了大量内置函数，不需要导入可以直接使用

```scss
@function 自定义函数(参数) {
  //...
  @return 返回值;
}

选择器 {
  属性: 自定义函数(参数);
  属性: 内置函数名(参数);
  //...
}
```

|     常用函数名     | 说明                 |
| :----------------: | -------------------- |
|      `rgb()`       | 将 RGB 值转换为颜色  |
|      `rgba()`      | 将 RGBA 值转换为颜色 |
|      `hsl()`       | 将 HSL 值转换为颜色  |
|      `hsla()`      | 将 HSLA 值转换为颜色 |
|     `darken()`     | 将颜色变暗           |
|    `lighten()`     | 将颜色变亮           |
|    `opacity()`     | 将颜色透明度增加     |
| `transparentize()` | 将颜色透明度减少     |

::: details 例子：内置函数

```scss{0}
$base-color: #3498db;

.element {
  // 颜色函数
  background-color: darken($base-color, 10%);
  border-color: lighten($base-color, 10%);
  color: rgba($base-color, 0.8);

  // 数学函数
  width: percentage(0.8);    // 80%
  height: round(3.7px);      // 4px
  margin: max(10px, 20px);   // 20px
}
```

:::

::: details 例子：自定义函数

```scss{0}
@function em($pixels, $context: 16) {
  @return ($pixels / $context) * 1em;
}

.text {
  font-size: em(20);         // 1.25em
  margin-bottom: em(32);     // 2em
}
```

:::
