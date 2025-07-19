# JavaScript Browser Storage

主要用于在浏览器中存储和检索数据

## localStorage

主要用于长期本地存储，无过期时间

- 存储大小：约 5~10MB
- 数据类型：仅支持字符串
- 作用域：同源（协议+域名+端口）

```js
// 获取
const string = localStorage.getItem("KEY");
const value = JSON.parse(string);

// 设定
localStorage.setItem("KEY", "value");

// 删除
localStorage.removeItem("KEY");
sessionStorage.clear();
```

::: details 例子：主题模式的读取与设定

```html
<button onclick="toggleTheme()">Toggle</button>

<script>
  window.onload = () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.className = savedTheme;
  };

  function toggleTheme() {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  }
</script>
```

:::

## sessionStorage

主要用于临时存储，但仅限当前标签页，页面关闭即清除

- 存储大小：约 5~10MB
- 数据类型：仅支持字符串
- 作用域：同源（协议+域名+端口）+ 同标签页

```js
// 获取
const string = sessionStorage.getItem("KEY");
const value = JSON.parse(string);

// 设定
sessionStorage.setItem("KEY", "sessionValue");

// 删除
sessionStorage.removeItem("KEY");
sessionStorage.clear();
```

::: details 例子：表单数据的中途保存

```html
<form oninput="saveDraft()">
  <input id="name" placeholder="姓名" />
  <textarea id="note" placeholder="备注"></textarea>
</form>

<script>
  window.onload = () => {
    name.value = sessionStorage.getItem("draft_name") || "";
    note.value = sessionStorage.getItem("draft_note") || "";
  };

  function saveDraft() {
    sessionStorage.setItem("draft_name", name.value);
    sessionStorage.setItem("draft_note", note.value);
  }
</script>
```

:::

## cookie

主要用于小数据、服务端通信（用户认证）

- 存储大小：约 4KB
- 数据类型：仅支持字符串

```js
document.cookie =
  "username=John; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
```

::: details 例子：

```html
<script>
  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
      const [k, v] = c.split("=");
      if (k === name) return v;
    }
    return "";
  }

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }

  setCookie("username", "张三", 7);
  console.log("当前用户是：", getCookie("username"));
</script>
```

:::

## indexDB

主要用于存储大量结构化数据，适合离线应用

- 存储大小：约 100MB~
- 数据类型：对象、二进制数据
- 作用域：同源（协议+域名+端口）

```js
const request = indexedDB.open("DATABASE_NAME", 1);

request.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction(["STORE_NAME"], "readonly");

  const objectStore = transaction.objectStore("STORE_NAME");
  const getRequest = objectStore.get("KEY");
  getRequest.onsuccess = (event) => {
    const result = event.target.result;
    console.log(result);
  };
};

request.onerror = (event) => {
  // ...
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore("STORE_NAME", {
    keyPath: "KEY", // 主键字段
    autoIncrement: true, // 是否自动生成主键
  });
};
```

::: details 例子：

```html
<script>
  let db;
  const request = indexedDB.open("UserDB", 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore("users", { keyPath: "id" });
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    saveUser({ id: 1, name: "张三", age: 30 });
    getUser(1);
  };

  function saveUser(user) {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    store.put(user);
  }

  function getUser(id) {
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const request = store.get(id);

    request.onsuccess = () => {
      console.log("用户信息：", request.result);
    };
  }
</script>
```

:::
