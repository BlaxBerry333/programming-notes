---
prev: false
next: false
---

# Nginx

![](/static/skill-images/web-infrastructure--nginx.png)

Nginx 是一个轻量级的 web 服务器

## 下载安装

::: code-group

```zsh [Docker]
# 0. 下载官方镜像
% docker pull nginx

# 1. 创建并运行容器 ( 启动 Nginx 服务 )
% docker run \
    --name [自定义容器名] \
    -p [宿主机端口:80] \
    -d \
    nginx

# 2. 进入容器
% docker exec -it [自定义容器名] bash
root@[自定义容器ID]:/# nginx -v
nginx version: nginx/1.27.5

# 3. 退出容器 ( 停止 Redis 服务 )
root@[自定义容器ID]:/data# exit
```

:::

## 启动服务器

Nginx 服务器默认开启在`80`端口

通过 Docker 启动的 Nginx 在容器运行后会自动启动服务器

```zsh
% curl http://localhost:80                          # [!code focus]
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

## 相关链接

[Nginx 入门指南](https://mp.weixin.qq.com/s/DaqxwzA0sxxQH7ej9CChDw)
