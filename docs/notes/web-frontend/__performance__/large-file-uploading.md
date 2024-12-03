# 优化大文件上传

## 切片上传

> Chunked Uploading

Web Worker

::: details 例子：手写文件的切片上传

```js
const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB

function uploadLargeFile(file) {
  if (!file) {
    alert("请选择上传的文件");
    return;
  }

  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  let currentChunk = 0;

  function uploadChunk() {
    if (currentChunk >= totalChunks) {
      console.log("文件上传完成");
      return;
    }

    const start = currentChunk * CHUNK_SIZE;
    const end = Math.main(start + CHUNK_SIZE, file.size);

    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("chunkNumber", currentChunk + 1);
    formData.append("totalChunks", totalChunks);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          currentChunk++;
          uploadChunk(); // 递归
        } else {
          console.log("Chunk上传失败");
        }
      })
      .catch((error) => {
        console.error("文件上传失败", error);
      });
  }

  uploadChunk();
}
```

:::

## 断点续传

> Resumable Uploading

IndexDB

## 断开重试

> Retry on Disconnect

## 上传进度
