# 优化请求接口的并发

## 请求队列

> Request Queue

请求队列可以确保在指定时间内允许并发执行的请求的最大个数

::: code-group

```js{0} [手写请求队列]
class RequestQueue {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent; // 最大请求并发数
    this.currentConcurrent = 0;         // 当前请求并发数
    this.queue = [];                    // 请求队列
  }

  add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      this.processQueue();
    });
  }

  processQueue() {
    if (this.queue.length > 0 && this.currentConcurrent < this.maxConcurrent) {
      const { request, resolve, reject } = this.queue.shift();
      this.currentConcurrent++;
      request()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.currentConcurrent--;
          this.processQueue();
        });
    }
  }
}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

const requestUrls = [
  "请求地址",
  "请求地址",
  "请求地址",
  // ...
]
const requestJobs = requestUrls.map((url) => {
  return () =>
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(url,response.status);
        return response.json();
      })
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
});

const requestQueue = new RequestQueue(5); // 比如设置最大可以并发5个请求

Promise.all(requestJobs.map((request) => requestQueue.add(request)))
  .then((result) => console.log("所有请求全部完成", result))
  .catch((error) => console.log("请求失败", error));
```

:::

## 防抖

> Debounce

防抖可以确保在指定时间内只执行一次处理，避免频繁发起请求

常用于输入框内容的的关联提示等处理

::: code-group

```js [手写防抖函数]
function debounce(callback, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, wait);
  };
}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

const debouncedFetcher = debounce((url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(url, response.status);
      return response.json();
    })
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
}, 4000);

debouncedFetcher("请求地址");
```

:::

## 节流

> Throttle

节流可以确保在指定间隔内只执行一次处理，避免频繁发起请求

常用于页面 resize、scroll 等处理

::: code-group

```js [手写节流函数]
function throttle(callback, interval) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      callback.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, interval);
    }
  };
}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

const throttleFetcher = throttle((url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(url, response.status);
      return response.json();
    })
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
}, 2000);

throttleFetcher("请求地址");
```

:::

## 分页加载

::: code-group

```js [手写分页加载]
const pageSize = 20;
let currentPage = 1;

let isLoading = false;

function loadingMore(callback = null) {
  if (isLoading) {
    return;
  }
  isLoading = true;

  fetch(`请求地址?size=${pageSize}&page=${currentPage}`)
    .then((response) => {
      if (!response.ok) throw new Error(url, response.status);
      return response.json();
    })
    .then((result) => {
      currentPage++;

      const container = document.getElementById("item-container");
      result.data.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.textContent = item.name;
        container.appendChild(itemElement);
      });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      isLoading = false;
    });
}

// 初始化加载
loadingMore();

// 页面滚动时到底后加载
window.addEventListener(
  "scroll",
  throttle(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadingMore();
    }
  }, 300),
);
```

:::
