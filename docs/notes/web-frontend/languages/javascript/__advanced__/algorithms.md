# JavaScript 算法

> Algorithms

## 搜索算法

### 深度优先搜索

> DFS

从根节点开始沿着一条线路尽可能深地搜索下去，到当前线路尽头后回溯，如此循环完整个线路

适用于线路的联通性处理、回溯处理

::: details 例子：DFS 递归

```js
function dfs(node) {
  const visited = new Set();

  if (visited.has(node)) return;
  visited.add(node);

  // 处理当前节点
  // console.log(node.value);

  // 递归访问所有相邻节点
  for (let neighbor of node.neighbors) {
    dfs(neighbor, visited);
  }
}
```

:::

::: details 例子：DFS 栈

```js
function dfsIterative(startNode) {
  const stack = [startNode];
  const visited = new Set();

  while (stack.length > 0) {
    const node = stack.pop();

    if (visited.has(node)) continue;
    visited.add(node);

    // 处理当前节点
    // console.log(node.value);

    // 将未访问的邻居节点加入栈
    for (let neighbor of node.neighbors) {
      stack.push(neighbor);
    }
  }
}
```

:::

---

### 广度优先搜索

> BFS

开始根节点开始逐层访问邻近节点，如此循环完整个线路

适用于最短路径搜索、层级遍历关系树

::: details 例子：BFS 队列

```js
function bfs(startNode) {
  let queue = [startNode];
  let visited = new Set();

  while (queue.length > 0) {
    let node = queue.shift();

    if (visited.has(node)) continue;
    visited.add(node);

    // 处理当前节点
    // console.log(node.value);

    // 将所有未访问的邻居节点加入队列
    for (let neighbor of node.neighbors) {
      queue.push(neighbor);
    }
  }
}
```

## 排序算法

### 快速排序

TODO:

---

### 归并排序

TODO:
