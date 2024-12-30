# 数据通信与网络

容器之间是相互独立隔离的，但是可通过网络实现容器相互间的数据通信

每一个容器在启动时都会连接到一个默认网络 ( docker0 )，为了方便使用也可以创建自定义网络

## 常用网络命令

### 创建

创建一个自定义网络

```zsh
% docker network create [网络名]
```

---

### 查看列表

查看本地的容器

```zsh
% docker network ls
```

---

### 连接

将容器连接到网络

```zsh
% docker run \
    # 其他选项
    --network [网络名] \
    [镜像名:版本]
```

```zsh
# 在容器1中访问容器2
% docker exec -it [容器1] bash
root@[容器1ID]:/# curl http://[容器2]:[容器2端口]
root@[容器1ID]:/# exit

# 在容器2中访问容器1
% docker exec -it [容器2] bash
root@[容器1ID]:/# curl http://[容器1]:[容器1端口]
root@[容器1ID]:/# exit
```
