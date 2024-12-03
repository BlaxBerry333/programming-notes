# React 常用内置函数

## lazy( )

该方法用于懒加载导入一个组件

懒加载导入的子组件在渲染时必须被内置组件[`<Suspense\>`](./builtin-components.md#suspense)包裹

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

## startTransition( )

该方法用于在当前组件范围内对状态的更新进行一个优先度降级

可用于解决耗时的状态更新会阻塞后续状态更新的问题

功能相当于内置钩子函数[`useTransition()`](./hooks.md#useTransition)

不能用于处理表单文本的连续输入，状态更新的优先度降级会导致快速连续的输入内容被覆盖

```tsx
import type { FC } from "react";
import { startTransition, useState, useCallback } from "react";

const 组件: FC = () => {
  const [状态, set状态] = useState<状态的数据类型>(状态的初始值); // [!code focus:5]

  const 更新状态 = useCallback(() => {
    startTransition(() => set状态(新值));
  }, []);

  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

## memo( )

该函数用于将一个组件转换为缓存组件

缓存组件会通过浅比较来检查组件参数`props`的变化，来避免不必要的组件重新渲染

```tsx{0}
import type { NamedExoticComponent } from "react";

const 组件: NamedExoticComponent = memo(() => {
  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
});
```

## createContext( )

该方法用于创建一个可以在组件间深层传递数据的上下文对象

下文对象中 Context Provider 组件包裹的深层子组件内可获取更新传递的数据

深层子组件内通过内置钩子函数[`useContext()`](./hooks.md#useContext)获取上下文传递的数据

```tsx{0}
import type { FC } from "react";
import { createContext, useContext } from "react";

const 上下文对象 = createContext<传递的数据的类型>(默认值);       // [!code focus]

const 组件: FC = () => {
  const 缓存的数据 = useMemo<传递的数据的类型>(() => 数据, [依赖项]);

  return (
    <上下文对象.Provider value={缓存的数据}>                    // [!code focus:3]
      <子组件 />
    </上下文对象.Provider>
  );
};

const 子组件: FC = () => {
  const 传递的数据 = useContext<传递的数据的类型>(上下文对象);

  if (!传递的数据) {
    // 当前组件没有被上下文 Provider 组件包裹时的处理
    // ...
  }

  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

- context + useState() 状态直接各自独立、状态的操作简单
- context + useReducer() 状态之间关系复杂、状态的操作复杂

## forwardRef( )

TODO:

## createPortal( )

该方法用于创建一个传送门 ( Portal ) 将一些 JSX 渲染到当前组件以外的其他 DOM 上

```tsx{0}
import type { FC } from "react";
import { createPortal } from "react";

const 组件: FC = () => {
  return (
    <>
      {createPortal(            // [!code focus:8]
        <>
          {/* 渲染内容 */}
          {/* 渲染内容 */}
        </>,
        目标DOM节点,
        唯一标识,
      )}
    </>
  );
};
```

::: details 例子：利用传送门 ( Portal ) 指定 JSX 要渲染在哪里

```tsx
import type { FC } from "react";
import { createPortal } from "react";

const ContentComponent: FC = () => {
  return (
    <>
      {createPortal(
        <p>Hello World</p>,
        document.getElementById("content-wrapper"),
        "xxx",
      )}
    </>
  );
};

const ContentWrapperComponent: FC = () => {
  return <div id="content-wrapper" />;
};
```

:::
