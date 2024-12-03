# React 常用内置组件

## <StrictMode\>

该组件主要用于包裹项目的根组件，为其启用开发环境下的严格模式

其中包裹的组件始终会调用渲染 2 次

```tsx{0}
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>                                            // [!code focus]
    <App />
  </React.StrictMode>,                                          // [!code focus]
);
```

## <Fragment\> ( <\>...</\> )

该组件用于作为一个不会被渲染到页面的父级节点包裹多个多个同级别子成员

|              | 说明                                                     |
| :----------: | -------------------------------------------------------- |
| `<Fragment>` | 仅可指定`key`属性添加唯一标识，多用于遍历渲染时父级节点  |
|     `<>`     | 不能携带任何属性，仅作为包裹多个多个同级子成员的父级节点 |

::: code-group

```tsx{0} [使用场景一]
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

```tsx{0} [使用场景二]
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

:::

## <Suspense\>

该组件用于延时加载其子组件，并在其子组件完成加载前展示一个 Loading 状态

其延时加载的子组件必须为内置函数[`lazy()`](./builtin-functions.md#lazy)懒加载导入的

```tsx{0}
import type { FC } from "react";
import { lazy } from "react";

import 普通组件 from "组件路径";
import LoadingComponent from "组件路径";

// 默认导出的组件                                       // [!code focus:4]
const 懒加载组件1 = lazy(() => import("组件路径"));
// 命名导出的组件
const 懒加载组件2 = lazy(() => import("组件路径").then((module) => ({ default: module.组件名 })));

const 组件: FC = () => {
  return (
    <>
      <Suspense fallback={<LoadingComponent />}>     // [!code focus:4]
        <懒加载组件1 />
        <懒加载组件2 />
      </Suspense>

      <普通组件 />
    </>
  );
};
```
