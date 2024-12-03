# React 钩子函数

> Hooks

以`use`开头的函数被称为钩子函数，用于实现组件间某些通用逻辑的共享

钩子函数只能在组件的顶层被调用，且要注意调用的顺序，在条件判断与循环中调用时会报错

组件每次重新渲染时都会重新调用其中所有的钩子函数

## 常用内置 Hooks

### useState( ) <Badge>状态 Hook</Badge> {#useState}

该钩子函数用于在当前组件范围内定义一个状态以及其更新函数

状态每次更新时会重新渲染当前组件，当前组件的每次重新渲染时也会导致该状态重新定义

状态不指定初始值时会默认使用`undefined`，状态的更新函数建议命名为`set状态`

```tsx
import type { FC } from "react";
import { useState, useCallback } from "react";

const 组件: FC = () => {
  const [状态, set状态] = useState<状态的数据类型>(状态的初始值); // [!code focus:11]

  // 更新为固定值
  const 更新状态 = useCallback(() => {
    set状态(新值);
  }, []);

  // 基于旧值更新
  const 更新状态 = useCallback(() => {
    set状态((旧状态) => 新值);
  }, []);

  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

---

### useReducer( ) <Badge>状态 Hook</Badge> {#useReducer}

该钩子函数用于在当前组件范围内定义一个状态以及一系列与其相关增删改操作的函数

当组件内定义的状态有一系列相关增删改操作时，建议使用`useReducer()`代替`useState()`

```tsx
import type { FC, Reducer } from "react";
import { useReducer, useCallback } from "react";

type 状态的数据类型 = ...;
type 动作对象类型 = { type: 更新状态的动作名; payload: 更新状态的参数类型 };
type 状态逻辑整合函数类型 = Reducer<状态的数据类型, 动作对象类型>;

const 状态逻辑整合函数: 状态逻辑整合函数类型 = (状态, 动作对象) => {          // [!code focus:10]
  switch (动作对象.type) {
    case "当前的操作动作":
      return 新的状态;
    case "当前的操作动作":
      return 新的状态;
    default:
      throw new Error();
  }
};

const 组件: FC = () => {
  const [状态, dispatch] = useReducer(状态逻辑整合函数, 初始值);          // [!code focus:5]

  const 状态更新处理 = useCallback(() => {
    dispatch({ type: "更新状态的动作名", payload: 更新状态的参数 });
  }, [dispatch]);

  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

::: details 例子：一个带有状态更新的基础数值 Reducer

```tsx{0}
import type { FC } from "react";
import { useReducer } from "react";

type StateType = {
  count: number;
};

type ActionType =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "update"; payload: number };

const initialState: StateType = {
  count: 0,
};

const countReducer: Reducer<StateType, ActionType> = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: initialState.count };
    case "update":
      return { count: action.payload };
    default:
      throw new Error(`action type not handled: ${(action as { type: string }).type}`);
  }
};

const SampleComponent: FC = () => {
  const [state, dispatch] = useReducer(countReducer, initialState);

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "update", payload: 10 })}>10</button>
    </>
  );
};
```

:::

---

### useContext( ) <Badge>上下文 Hook</Badge> {#useContext}

该钩子函数用于获取深处传递的上下文对象中的数据

使用该钩子函数的组件必须被 [上下文对象 Context Provider](./builtin-functions.md#createcontext) 组件包裹

```tsx
import type { FC } from "react";
import { createContext, useContext } from "react";

const 上下文对象 = createContext<传递的数据的类型>(默认值);

const 组件: FC = () => {
  const 缓存的数据 = useMemo<传递的数据的类型>(() => 数据, [依赖项]);

  return (
    <上下文对象.Provider value={缓存的数据}>
      <子组件 />
    </上下文对象.Provider>
  );
};

const 子组件: FC = () => {
  const 传递的数据 = useContext<传递的数据的类型>(上下文对象); // [!code focus:6]

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

---

### useRef( ) <Badge>引用 Hook</Badge> {#useRef}

该钩子函数用于在当前组件范围内存储一个引用对象 ( Reference )

该引用数据更新时不会导致组件重新渲染，当前组件的每次重新渲染时也不会影响到该数据

常用于存储元素实例对象、不需要在组件视图中展示并实时更新的数据

想要存储一个自定义组件的实例对象时，自定义组件需要通过内置方法[`forwardRef()`](./builtin-functions.md#forwardref)包裹

::: code-group

```tsx [存储数据]
import type { FC } from "react";
import { useRef, useCallback } from "react";

const 组件: FC = () => {
  const 引用对象 = useRef<存储的数据类型>(数据的初始值); // [!code focus:9]

  const 读取存储数据 = useCallback(() => {
    console.log(引用对象.current);
  }, []);

  const 更新存储数据 = useCallback(() => {
    引用对象.current = 新值;
  }, []);

  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

```tsx [存储元素实例]
import type { FC } from "react";
import { useRef, useCallback } from "react";

const 组件: FC = () => {
  const 引用对象 = useRef<HTML原生标签类型 | null>(null); // [!code focus:11]

  const 读取存储实例上的数据 = useCallback(() => {
    console.log(引用对象.current);
  }, []);

  const 使用存储实例上的方法 = useCallback(() => {
    引用对象.current.方法();
  }, []);

  return <HTML原生标签 ref={引用对象} />;
};
```

:::

---

### useImperativeHandle( ) <Badge>引用 Hook</Badge> {#useImperativeHandle}

该钩子函数用于将当前组件内成员暴露给接收自父组件的引用对象 ( Reference )

TODO:

> [!IMPORTANT] 使用步骤：
>
> 1. 父组件传递引用对象给子组件
> 2. 子组件通过内置方法[`forwardRef()`](./builtin-functions.md#forwardref)包裹使其可以接收引用对象
> 3. 子组件内部通过该钩子函数`useImperativeHandle()`将自身成员暴露给引用对象
> 4. 父组件通过传递的引用对象使用子组件暴露出来的成员

---

### useEffect( ) <Badge>副作用 Hook</Badge> {#useEffect}

该钩子函数会在当前组件加载完成后异步执行一次，如果有依赖项则依赖项变更时会再次执行

该钩子函数可以有一个函数作为返回值，该返回函数会在组件卸载时执行

```tsx{0}
import type { FC } from "react";
import { useEffect } from "react";

const 组件: FC = () => {
  useEffect(() => {           // [!code focus:14]
    // ...
  }, []);

  useEffect(() => {
    // ...
  }, [依赖项]);

  useEffect(() => {
    // ...
    return () => {
      // ...
    }
  }, [依赖项]);

  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

---

### useLayoutEffect( ) <Badge>副作用 Hook</Badge> {#useLayoutEffect}

该钩子函数会在当前组件加载完成且页面更新绘制 DOM 之前同步执行

过于复杂的耗时逻辑可会阻塞浏览器的绘制

```tsx{0}
import type { FC } from "react";
import { useLayoutEffect } from "react";

const 组件: FC = () => {
  useLayoutEffect(() => {           // [!code focus:3]
    // ...
  }, [依赖项]);

  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

---

### useMemo( ) <Badge>性能优化 Hook</Badge> {#useMemo}

该钩子函数用于在当前组件范围内缓存一个计算量较大的数据，可避免组件重新渲染时的重新计算

若依赖项为空数组，则该数据的值为组件初次渲染导致的初次定义后的缓存值

```tsx{0}
import type { FC } from "react";
import { useMemo } from "react";

const 组件: FC = () => {
  const 缓存的数据 = useMemo<数据类型>(() => {           // [!code focus:4]
    // ...
    return 数据
  }, [依赖项]);

  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

---

### useCallback( ) <Badge>性能优化 Hook</Badge> {#useCallback}

该钩子函数用于在当前组件范围内缓存一个函数的定义，可避免组件重新渲染时的重新定义

若依赖项为空数组，则该函数为组件初次渲染导致的初次定义后的缓存值

```tsx{0}
import type { FC } from "react";
import { useCallback } from "react";

const 组件: FC = () => {
  const 缓存的函数 = useCallback((参数: 参数类型): 函数返回值 => {  // [!code focus:7]
    // ...
  }, [依赖项]);

  const 缓存的函数: 函数类型 = useCallback((参数) => {
    // ...
  }, [依赖项]);

  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

---

### useDeferredValue( ) <Badge>性能优化 Hook</Badge> {#useDeferredValue}

该钩子函数用于在当前组件范围内对一个定义一个延时更新的现有状态

可用于解决短时间内频繁更新状态时导致的页面响应阻塞 ( 比如表单文本的连续输入 )

该钩子函数不是万能的，大量数据与长列表导致的渲染阻塞还是建议使用虚拟列表等技术进行改善

```tsx{0}
import type { FC } from "react";
import { useDeferredValue, useState } from "react";

const 组件: FC = () => {
  const [状态] = useState<状态的数据类型>(状态的初始值);          // [!code focus:3]

  const 延时更新的状态 = useDeferredValue<状态的数据类型>(状态);

  return (
    <>
      {/* 渲染内容 */}
      {/* 渲染内容 */}
    </>
  );
};
```

::: details 例子：改善根据表单输入框的值动态生成 10 万个节点时的渲染阻塞

```tsx
import type { FC } from "react";
import { useDeferredValue, useState } from "react";

const SampleComponent: FC = () => {
  const [value, setValue] = useState<string>("");
  const deferredValue = useDeferredValue(value);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => setValue(e.target.value), []);

  return (
    <>
      <input value={value} onChange={handleOnChange} />

      {deferredValue.length > 0 && (
        <ul>
          {[...Array(100000)].fill(deferredValue).map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}
    </>
  );
};
```

:::

---

### useTransition( ) <Badge>性能优化 Hook</Badge> {#useTransition}

该钩子函数用于在当前组件范围内对状态的更新进行一个优先度降级

可用于解决耗时的状态更新会阻塞后续状态更新的问题

功能相当于附带了状态更新进度的内置函数[`startTransition()`](./builtin-functions.md#starttransition)

不能用于处理表单文本的连续输入，状态更新的优先度降级会导致快速连续的输入内容被覆盖

```tsx
import type { FC } from "react";
import { useTransition, useState, useCallback } from "react";

const 组件: FC = () => {
  const [状态, set状态] = useState<状态的数据类型>(状态的初始值); // [!code focus:11]

  const [isPending, startTransition] = useTransition();

  const 更新状态 = useCallback(() => {
    startTransition(() => set状态(新值));
  }, []);

  if (isPending) {
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

::: details 例子：改善 Tab 切换时展示 10 万个节点时的渲染阻塞

```tsx
import type { FC } from "react";
import { useTransition, useState, useCallback } from "react";

const tabs = ["Tab1", "Tab2"];

const SampleComponent: FC = () => {
  const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>("Tab1");

  const [isPending, startTransition] = useTransition();

  const handleTabChange = useCallback(
    (name: string) => startTransition(() => setSelectedTab(name)),
    [],
  );

  return (
    <>
      <nav>
        {tabs.map((name) => (
          <button
            key={name}
            style={{ color: selectedTab === name ? "red" : "black" }}
            disabled={isPending}
            onClick={() => handleTabChange(name)}
          >
            {name}
          </button>
        ))}
      </nav>

      {isPending && <div>Loading...</div>}

      {!isPending && (
        <ul>
          {[...Array(100000)].map((_, i) => (
            <li key={i}>{`${selectedTab} - ${i}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};
```

:::

---

### useId( )

该钩子函数用于在当前组件范围内定义一个绝对不会重复的唯一字符串值

```tsx{0}
import type { FC } from "react";
import { useId } from "react";

const 表单控件组件: FC<{ label: string }> = ({ label }) => {
  const 唯一值: string = useId();                               // [!code focus]

  return (
    <>                                                         // [!code focus:4]
      <label htmlFor={唯一值}>{label}</label>
      <input id={唯一值} />
    </>
  );
};
```

> [!IMPORTANT] 注意点
>
> - 建议用于表单控件的唯一 ID，以及元素无障碍属性的唯一值
> - 不能用于作为列表渲染仕的唯一值，列表渲染时的k`key`应该源于列表数据

## 自定义 Hooks

自定义钩子函数的名称是必须以`use`开头的小驼峰命名 ( camelCase )

建议积极利用自定义钩子函数实现组件逻辑与视图的分离以及逻辑复用，来保持组件内结构的简洁

- [ahooks](https://ahooks.js.org/zh-CN)
