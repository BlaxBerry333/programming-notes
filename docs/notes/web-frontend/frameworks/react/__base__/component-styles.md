# React 组件样式

## 内联样式

> Inline Styles

在 JSX 中直接通过原生标签的`style`属性来指定样式

样式的复用可能会麻烦

```tsx
import type { FC } from "react";

const 组件: FC = () => {
  return (
    <>
      <HTML原生标签
        style={{
          属性字段: 值,
          属性字段: 值,
        }}
      />
    </>
  );
};
```

## 外部样式对象

```tsx
import type { CSSProperties, FC } from "react";

const 样式对象: CSSProperties = {
  属性字段: 值,
  属性字段: 值,
};

const 组件: FC = () => {
  return (
    <>
      <HTML原生标签 style={样式对象} />
    </>
  );
};
```

## 外部样式文件

> Style Sheets

在外部样式表文件`.css`、`.scss`中定义全局样式

并在 JSX 中通过原生标签的`className`、`id`属性来指定样式

## 外部模块化样式文件

> Modular Styles

以模块化的形式`.module.css`、`.module.scss`中定义局部样式

可以实现样式隔离

## 原子类名

> Atomic Classes

- [Tailwind CSS](https://tailwindcss.com/docs/installation)

通过将多个具体的 CSS 类组合到一起灵活控制组件样式

样式复杂时大量类名类名的堆砌会使结构变得冗长，且影响代码的可读性

如果非要用不可的话建议对组件进行细分颗粒化

## CSS-in-JS

- [Styled Components](https://styled-components.com/)
- [Emotion](https://emotion.sh/docs/introduction)
- [MUI](https://mui.com/core/)
