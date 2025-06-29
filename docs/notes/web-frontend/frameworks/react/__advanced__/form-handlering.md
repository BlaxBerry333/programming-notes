# React 表单处理

React 提供了受控、非受控两种模式处理表单

## 受控 ( Controlled )

受控是指通过一个状态 ( State ) 来维护表单元素的值

- 表单元素通过属性`value`将状态渲染为输入值
- 表单元素通过事件`onChange`在每次输入时触发状态更新
- 状态更新时 React 会重新渲染从而更新输入值的显示

> [!IMPORTANT] 优点：
>
> - 实时校验和格式化输入值
> - 统一管理状态，便于维护

> [!CAUTION] 缺点：
>
> - 每次输入值都需要触发状态更新，大量表单元素与输入频繁变更时会造成性能问题
> - 每个表单元素对应一个状态，会导致状态数量过多代码繁琐

```tsx
import React, { useState } from "react";

export default function ControlledForm() {
  const [value, setValue] = useState<string>("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <form>
        <input value={value} onChange={handleChange} />
      </form>

      <p>Current Value: {value}</p>
    </>
  );
}
```

## 非受控 ( Uncontrolled )

非受控是指通过一个引用 ( Ref ) 直接操作表单元素的 DOM 节点

- 表单元素通过`ref`将 DOM 节点存储在一个变量中
- 某个特定事件时通过`ref`获取表单元素的值
- 表单元素通过属性`defaultValue`为输入值渲染一个默认值

> [!IMPORTANT] 优点：
>
> - 表单元素的值由 DOM 自身管理，不需要 React 管理状态，提高代码可读性
> - 表单元素值变化时不会实时都触发 React 重新渲染，减少性能开销

> [!CAUTION] 缺点：
>
> - 无法实现对输入值的实时校验和格式化，只能在某一个时间点来获取表单元素的值
> - 脱离了 React 的状态管理，特定场合可能会带来不可预测的行为

```tsx
import React, { useRef } from "react";

const DEFAULT_VALUE: string = "";

export default function UncontrolledForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      console.log(inputRef.current.value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue={DEFAULT_VALUE} />
      <button type="submit">Submit</button>
    </form>
  );
}
```
