# React 标签语法

> JavaScript XML / TypeScript XML

React 组件内使用 JSX / TSX 来渲染要展示的页面结构

## 渲染内容

JSX 中可以直接渲染 HTML 原生标签、JavaScript 数据、React 组件

渲染多个同级别成员时必须在外面包裹一个标签 ( 可使用空标签 )

```tsx{0}
import type { FC } from "react";

const 组件: FC = () => {
  return (
    <>                          // [!code focus:5]
      {/* 渲染内容 */}
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

---

### HTML 原生标签

JSX 中的原生标签的属性名要使用小骆驼 ( camelCase )

没有子元素的标签要自闭合

```tsx{0}
import type { FC } from "react";

const 组件: FC = () => {
  return (
    <>                          // [!code focus:7]
      <HTML原生标签 />
      <HTML原生标签 属性 属性={值} 属性={{ 属性字段: 值, 属性字段: 值 }} />
      <HTML原生标签>
        {/* 渲染内容 */}
        {/* 渲染内容 */}
      </HTML原生标签>
    </>
  );
};
```

> [!IMPORTANT] 特殊属性名
>
> - `class`→`className`
> - `for`→`htmlFor`

---

### JavaScript 数据

TSX 中可将 JavaScript 的数据或表达式的返回值渲染到大括号`{ }`中

```tsx{0}
import type { FC } from "react";

const 组件: FC = () => {
  return (
    <>                              // [!code focus:11]
      静态文本内容
      {"文本内容"}
      {JavaScript数据}
      {JavaScript表达式}
      {JavaScript函数()}
      {(() => {
        // 执行 JavaScript 脚本
        // return 要渲染的内容
      })()}
    </>
  );
};
```

> [!CAUTION] 特殊数据不会被渲染
> JSX 不会展示`null`、`undefined`、`false`、`true`、`Infinity`、`-Infinity`到页面<br/>
> 可灵活利用此特点使组件不渲染页面结构内但是仍然可以执行其内部逻辑
>
> ```tsx
> import type { FC } from "react";
>
> const 组件: FC = () => {
>   if (条件) {
>     return null;
>   }
>   return <>{/* 渲染内容 */}</>;
> };
> ```

---

### React 组件

::: code-group

```tsx{0} [直接渲染组件]
import type { FC } from "react";

const 组件: FC = () => {
  return (
    <>                          // [!code focus:4]
      <React组件 />
      <React组件 />
    </>
  );
};
```

```tsx{0} [渲染缓存后的组件]
import type { FC } from "react";
import { useMemo } from "react";

const 组件: FC = () => {
  const 缓存后的组件内容 = useMemo<JSX.Element>(() => <React组件 />, []);   // [!code focus:]

  return (
    <>                                                                   // [!code focus:4]
      {缓存后的组件内容}
      {缓存后的组件内容}
    </>
  );
};
```

:::

## 条件渲染

SX 中可以使用 JavaScript 的逻辑运算符、三元表达式进行条件渲染

```tsx{0}
import type { FC } from "react";

const 组件: FC = () => {
  return (
    <>                                  // [!code focus:5]
      { 条件 ? 渲染内容1 : 渲染内容2 }
      { 条件 && 渲染内容 }
      { 条件 || 渲染内容 }
    </>
  );
};
```

> [!CAUTION] 逻辑运算符<code>&&</code>的问题点
>
> - 空数组、空对象不能作为判断条件，否则会被永远视为`true`
> - 数值`0`不能作为判断条件，否则会被直接渲染
>
> ```tsx{0}
> import type { FC } from "react";
>
> const emptyArray = [];                           // [!code focus:2]
> const emptyObject = {};
>
> const 组件: FC = () => {
>   return (
>     <>                                           // [!code focus:8]
>       { emptyArray && 渲染内容 }                  // [!code --:3]
>       { emptyObject & 渲染内容 }
>       { emptyArray.length && 渲染内容 }
>       { !!emptyArray.length && 渲染内容 }         // [!code ++:2]
>       { Boolean(emptyArray.length) && 渲染内容 }
>     </>
>   );
> };
> ```

> [!CAUTION] 三元表达式的问题点
> 三元表达式切换同名输入类控件切换时会有数据残留问题
>
> - 解决方法一: 改用逻辑运算符形成单独判断分支
> - 解决方法二: 添加唯一标识`key`来表明切换前后并非同一标签
>
> ```tsx{0}
> import type { FC } from "react";
>
> const 组件: FC = () => {
>   return (
>     <>                                                                          // [!code focus:8]
>       {isTextType ? <input /> : <input type="password" />}                      // [!code --]
>       {/* 解决方法一 */}
>       {isTextType && <input />}                                                 // [!code ++:2]
>       {!isTextType && <input type="password" />}
>       {/* 解决方法二 */}
>       {isTextType ? <input key="txt" /> : <input type="password" key="pwd" />}  // [!code ++]
>     </>
>   );
> };
> ```

## 列表渲染

JSX 中可以使用 JavaScript 的数组方法`map()`渲染一个列表数据

渲染的列表中的每一个子元素需要通过`key`属性指定一个唯一标识

```tsx{0}
import type { FC } from "react";
import { Fragment } from "react";

const 组件: FC = () => {
  return (
    <>                                          // [!code focus:8]
      {可遍历数据.map((元素, 索引) => (
        <Fragment key={唯一key}>
            {/* 渲染内容 */}
            {/* 渲染内容 */}
        </Fragment>
      ))}
    </>
  );
};
```

## 事件处理

::: code-group

```tsx{0} [缓存函数写法]
import type { FC } from "react";
import { useCallback } from "react";

const 组件: FC = () => {
  const 事件处理函数 = useCallback(() => { /** 处理逻辑 */ }, [依赖项]);                    // [!code focus:4]
  const 事件处理函数 = useCallback((自定义参数) => { /** 处理逻辑 */ }, [依赖项]);
  const 事件处理函数 = useCallback((事件对象) => { /** 处理逻辑 */ }, [依赖项]);
  const 事件处理函数 = useCallback((事件对象, 自定义参数) => { /** 处理逻辑 */ }, [依赖项]);

  return (
    <>                                                                                  // [!code focus:6]
      <HTML原生标签 on事件={事件处理函数} />
      <HTML原生标签 on事件={() => 事件处理函数(自定义参数)} />
      <HTML原生标签 on事件={事件对象 => 事件处理函数(事件对象)} />
      <HTML原生标签 on事件={事件对象 => 事件处理函数(事件对象, 自定义参数)} />
    </>
  );
};
```

```tsx{0} [内联函数写法 <Badge type="warning">不推荐</Badge>]
import type { FC } from "react";

const 组件: FC = () => {
  return (
    <>                            // [!code focus:7]
      <HTML原生标签
        on事件={(事件对象) => {
          /** 处理逻辑 */
        }}
      />
    </>
  );
};
```

:::

::: details 例子：几个常用事件`onClick`、`onMouseEnter`、`onBlur`、`onChange`

```tsx{0}
import type { FC } from "react";
import { useCallback } from "react";

const SampleComponent: FC = () => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback((event) => {
      // ...
    }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      // ...
    }, []);

  const handleMouseEnter: React.MouseEventHandler<HTMLInputElement> =
    useCallback((event) => {
      // ...
    }, []);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> =
    useCallback((event) => {
      // ...
    }, []);

  return (
    <>
      <button onClick={handleClick}>点击</button>
      <input
        onChange={handleChange}
        onBlur={handleClick}
        onMouseEnter={handleClick}
      />
    </>
  );
};
```

:::

> [!CAUTION] React 不建议使用内联写法定义事件处理函数
>
> - 内联写法定义的事件处理函数会在组件每次重新渲染时都会被重新定义
> - 逻辑与视图被绑定到了一起，辑复杂时会导致 JSX 结构变得冗长可读性差
