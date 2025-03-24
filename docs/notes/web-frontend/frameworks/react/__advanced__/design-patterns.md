# React 设计规范

## 高内聚

> High Cohesion

### 单一职责

> SRP ( Single Responsibility Principle )

- 组件内部应当逻辑紧密
- 每个组件只负责各自的功能，不要杂糅多个功能逻辑
- 复杂的界面与交互建议尽可能细分拆为多个独立的小组件

::: code-group

```tsx [👎]
const Buttons: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((s) => s + 1);
  const decrease = () => setCount((s) => s - 1);
  return (
    <>
      <div>{count}</div>
      <button onClick={increment}>+1</button>
      <button onClick={decrease}>-1</button>
    </>
  );
};
```

```tsx [👍]
const Buttons: React.FC = () => {
  const { count, increment, decrease } = useButton();
  return (
    <>
      <div>{count}</div>
      <IncreaseButton onClick={increment}>+1</IncreaseButton>
      <DecreaseButton onClick={decrease}>-1</DecreaseButton>
    </>
  );
};

type Props = React.PropsWithChildren<{ onClick: VoidFunction }>;

const IncreaseButton: React.FC<Props> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

const DecreaseButton: React.FC<Props> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

const useButton = () => {
  const [count, setCount] = useState<number>(0);
  const increment = () => setCount((s) => s + 1);
  const decrease = () => setCount((s) => s - 1);
  return { count, increment, decrease };
};
```

:::

## 低耦合

> Low Coupling

### 避免直接访问状态

- 父组件通过 context、props 将数据和回调函数传递给子组件
- 子组件只负责渲染和触发回调，而不直接操作父组件的状态或逻辑

::: code-group

```tsx [👎]
import React from "react";

type ChildRef = {
  setText: (text: string) => void;
};

const Parent: React.FC = () => {
  const childRef = React.useRef<ChildRef>(null);
  const handleClick = () => {
    if (childRef.current) childRef.current.setText("新值");
  };
  return (
    <>
      <Child ref={childRef} />
      <button onClick={handleClick}>更新</button>
    </>
  );
};

const Child = React.forwardRef<ChildRef, {}>((_, ref) => {
  const [text, setText] = React.useState<string>("初始值");
  React.useImperativeHandle(ref, () => ({
    setText,
  }));
  return <div>{text}</div>;
});
```

```tsx [👍]
import React from "react";

const Parent: React.FC = () => {
  const [text, setText] = React.useState<string>("初始值");
  return <Child text={text} setText={setText} />;
};

type ChildProps = {
  text: string;
  setText: (newVal: string) => void;
};

const Child: React.FC<ChildProps> = ({ text, setText }: ChildProps) => {
  return (
    <>
      <div>{text}</div>
      <button onClick={() => setText("新值")}>更新</button>
    </>
  );
};
```

:::

---

### 降低跨层级耦合

> Context API Pattern、Redux Pattern...

- 使用全局状态 Context、Store 管理深处组件的间的共享的数据
- 不建议通过 props 层层传递

::: code-group

```tsx [👎]
type Props = { message: string };

const App: React.FC = () => <Level1 message="xxx" />;
const Level1: React.FC<Props> = ({ message }) => <Level2 message={message} />;
const Level2: React.FC<Props> = ({ message }) => <Level3 message={message} />;
const Level3: React.FC<Props> = ({ message }) => <div>{message}</div>;
```

```tsx [👍]
import React from "react";

type MessageContextType = {
  message: string;
};

const MessageContext = React.createContext<MessageContextType>({
  message: "",
});

const App: React.FC = () => {
  return (
    <MessageContext.Provider value={{ message: "值" }}>
      <Level1 />
    </MessageContext.Provider>
  );
};
const Level1: React.FC = () => <Level2 />;
const Level2: React.FC = () => <Level3 />;
const Level3: React.FC = () => {
  const context = React.useContext(MessageContext);
  if (!context) return null;
  return <div>{context.message}</div>;
};
```

:::

---

### 分离界面与功能

> Hooks Pattern

- 组件是无状态的只负责渲染与交互
- 功能逻辑抽离到自定义 Hooks

::: code-group

```tsx [👎]
const Button: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);
  const handleClick = () => setCount(count + 1);
  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px",
        backgroundColor: "pink",
        border: "2px solid blue",
      }}
    >
      {count}
    </button>
  );
};
```

```tsx [👍]
const Button: React.FC = () => {
  const { count, handleClick } = useButton();
  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px",
        backgroundColor: "pink",
        border: "2px solid blue",
      }}
    >
      {count}
    </button>
  );
};

const useButton = () => {
  const [count, setCount] = React.useState<number>(0);
  const handleClick = () => setCount(count + 1);
  return { count, handleClick };
};
```

:::

---

### 分离容器与展示界面

> Container-Component Pattern ( Smart-Dumb Component Pattern )

- 容器组件：负责数据获取、状态管理、功能逻辑
- 展示组件：负责界面渲染，无状态的，通过 props 接收容器传递的数据和回调函数

::: code-group

```tsx [👎]
type User = {
  id: number;
  name: string;
  email: string;
};

const UserList: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    fetch("URL")
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, []);
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
    </>
  );
};
```

```tsx [👍]
type User = {
  id: number;
  name: string;
  email: string;
};

type UserListProps = {
  users: User[];
};

const UserListContainer: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    fetch("URL")
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, []);
  return <UserList users={users} />;
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
    </>
  );
};
```

:::
