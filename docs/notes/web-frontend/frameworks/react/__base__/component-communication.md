# React 组件通信

## props 传递

React 组件可通过`props`传递任何 JavaScript 的值 ( 对象、数组、函数、JSX )

适用于简单、扁平的父子组件间数据传递

- 父 ➡︎ 最近一级的子
- 子 ➡︎ 最近一级的父

TODO:

## context 深层传递

- 父 ➡︎ 任意层级的后代

仅建议用于用户信息、主题、国际化设置

- context + useState() 状态直接各自独立、状态的操作简单
- context + useReducer() 状态之间关系复杂、状态的操作复杂

TODO:

## ref 传递

- 父 ➡︎ 最近一级的子
- 子 ➡︎ 最近一级的父

TODO:

## 第三方工具

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
