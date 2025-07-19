---
prev: false
next: false
---

# Redis

![](/static/skill-images/database--redis.png)

> Remote Dictionary Server

Redis 是一种 NoSQL 数据库，以字典的形式存储数据

常用于作为数据库缓存、消息队列等

## 下载安装

:::code-group

```zsh [Docker]
# 0. 下载官方镜像                                   # [!code focus:2]
% docker pull redis:6.24

# 1. 创建并运行容器 ( 启动 Redis 服务 )               # [!code focus:6]
% docker run \
    --name 容器名 \
    -p 宿主机端口号:6379 \
    -d \
    redis

# 2. 进入容器                                      # [!code focus:3]
% docker exec -it 容器名 bash
root@容器ID:/data# redis-server --version
Redis server v=6.4.2 sha=00000000:0 malloc=jemalloc-5.3.0 bits=64 build=f7bb3bd8ed3c667e

# 4. 退出容器 ( 停止 Redis 服务 )                   # [!code focus:2]
root@容器ID:/data# exit
```

```zsh [Docker Compose]
% cd 项目名

# 0. 创建 docker-compose.yml 文件                                             # [!code focus:18]
% echo '
services:
  服务名:
    image: redis:6.2.4
    container_name: 容器名
    ports:
      - 宿主机端口号:6379
    volumes:
      - 数据卷名:/data
    networks:
      - 网络名
volumes:
  数据卷名:
networks:
  网络名:
    driver: bridge
' > docker-compose.yml

# 1. 创建并运行服务                                                            # [!code focus:2]
% docker compose -f ./docker-compose.yml -p 项目名 up -d 服务名

# 2. 进入容器                                                                 # [!code focus:3]
% docker-compose -f ./docker-compose.yml -p 项目名 exec 服务名 bash
root@容器ID:/data# redis-server --version
Redis server v=6.4.2 sha=00000000:0 malloc=jemalloc-5.3.0 bits=64 build=f7bb3bd8ed3c667e

# 3. 退出容器                                                                 # [!code focus:2]
root@容器ID:/data# exit

# 4. 停止并并删除服务 ( 保留数据卷 )                                             # [!code focus:2]
% docker compose  -f ./docker-compose.yml -p 项目名 down

# 5. 停止并并删除服务 ( 彻底清空 )                                               # [!code focus:2]
% docker compose -f ./docker-compose.yml -p 项目名 down -v
```

:::

---

### 启动服务器

Redis 服务器默认开启在`6379`端口

通过 Docker 启动的 Redis 在容器运行后会自动启动服务器

````zsh
% docker exec -it [自定义容器名] bash
root@[自定义容器ID]:/data# redis-server                        # [!code focus]
32:C 13 Jan 2025 07:48:49.580 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
32:C 13 Jan 2025 07:48:49.580 * Redis version=7.4.2, bits=64, commit=00000000, modified=0, pid=32, just started
32:C 13 Jan 2025 07:48:49.580 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
32:M 13 Jan 2025 07:48:49.581 * monotonic clock: POSIX clock_gettime
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis Community Edition
  .-`` .-```.  ```\/    _.,_ ''-._     7.4.2 (00000000/0) 64 bit
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 32
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           https://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

32:M 13 Jan 2025 07:48:49.586 # Warning: Could not create server TCP listening socket *:6379: bind: Address already in use
32:M 13 Jan 2025 07:48:49.586 # Failed listening on port 6379 (tcp), aborting.
````

---

### 启动客户端

Redis 客户端也默认连接到`6379`端口启动的服务器

```zsh
% docker exec -it [自定义容器名] bash
root@[自定义容器ID]:/data# redis-cli               # [!code focus]
[主机IP地址]:[Redis服务端口号]> # Redis CLI 命令
[主机IP地址]:[Redis服务端口号]> exit
```

## 常用命令

### 获取所有键

```zsh
KEYS *                              # [!code focus]
序号) "键1"
序号) "键2"
```

---

### 键值对是否存在

```zsh
EXISTS [键] [值]                     # [!code focus]
(integer) 1     # 目标键值对成功删除时
(integer) 0     # 目标键值对不存在时
```

---

### 键值对的过期时间

```zsh
TTL [键]                             # [!code focus]
```

---

### 消息的发布订阅

通过同一个频道实现消息的传递

消息无法持久化、无法记录历史 ( 但是可通过Stream 流实现 )

```zsh
# 消息发布
PUBLISH [频道] [消息]

# 消息订阅
SUBSCRIBE [频道]
```

::: details 例子：通过消息的发布订阅实现本机上跨终端数据传输

::: code-group

```zsh [发布消息的终端]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@97101aa72bbf:/data# redis-cli
# 第一次发布信息                                               # [!code hl:6]
127.0.0.1:6379> PUBLISH xxx hello
(integer) 1
# 第二次发布信息
127.0.0.1:6379> PUBLISH xxx "[1, 2, 3]"
(integer) 1
```

```zsh [订阅消息的终端]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@97101aa72bbf:/data# redis-cli
127.0.0.1:6379> SUBSCRIBE xxx                                # [!code hl:14]
1) "subscribe"
2) "xxx"
3) (integer) 1
# 接收到第一次发布的消息
Reading messages... (press Ctrl-C to quit or any key to type command)
1) "message"
2) "xxx"
3) "hello"
# 接收到第二次发布的消息
Reading messages... (press Ctrl-C to quit or any key to type command)
1) "message"
2) "xxx"
3) "[1, 2, 3]"
```

:::

## 数据类型

### 字符串 ( String )

是最基本的数据类型，存储的是二进制安全的字符串

```zsh
# 创建
SET [键] [值]

# 获取
GET [键]

# 删除
DEL [键]

# 向存储的字符串结尾拼接新值
APPEND [键] [值]

# 将存储的数值字符串 +1
INCR [键]
```

> [!IMPORTANT] 以原始格式显示字符串
>
> 字符串是以二进制形式存储的，若想以原始格式显示字符串时加上选择项`--raw`
>
> ::: code-group
>
> ```zsh [Docker]
> % docker run --name study_redis -p 6379:6379 -d --rm redis
> % docker exec -it study_redis bash
> root@[自定义容器ID]:/data# redis-cli                 # [!code --]
> 127.0.0.1:6379> SET yyy 你好
> OK
> 127.0.0.1:6379> GET yyy
> "\xe4\xbd\xa0\xe5\xa5\xbd"
> 127.0.0.1:6379> exit
> root@f62d6fc2dfac:/data# redis-cli --raw            # [!code ++]
> 127.0.0.1:6379> GET yyy
> 你好
> ```
>
> :::

::: details 例子：字符串类型键值对的`SET`、`GET`、`DEL`操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> SET xxx 123                                 # [!code hl:8]
OK
127.0.0.1:6379> GET xxx
"123"
127.0.0.1:6379> DEL xxx
(integer) 1
127.0.0.1:6379> GET xxx
(nil)
```

:::

::: details 例子：字符串类型键值对的`APPEND`操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> SET xxx a                              # [!code hl:10]
OK
127.0.0.1:6379> GET xxx
"a"
127.0.0.1:6379> APPEND xxx 12
(integer) 3
127.0.0.1:6379> APPEND xxx 345
(integer) 6
127.0.0.1:6379> GET xxx
"a12345"
```

:::

::: details 例子：字符串类型键值对的`INCR`操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> SET xxx 10                                # [!code hl:10]
OK
127.0.0.1:6379> GET xxx
"10"
127.0.0.1:6379> INCR num
(integer) 11
127.0.0.1:6379> INCR num
(integer) 12
127.0.0.1:6379> GET xxx
"12"
```

:::

---

### 列表 ( List )

是一个有序的链表

```zsh
# 向列表尾部添加元素，若不存在则先创建后追加
RPUSH [键] [元素]
RPUSH [键] [元素1] [元素2] [元素3]

# 向列表头部追加元素，若不存在则先创建后追加
LPUSH [键] [元素]
LPUSH [键] [元素1] [元素2] [元素3]

# 从列表尾部删除元素
RPOP [键]
RPOP [键] [个数]

# 从列表头部删除元素
LPOP [键]
LPOP [键] [个数]

# 删除整个列表
DEL [键]

# 获取指定范围的元素
LRANGE [键] [开始索引] [结束索引]
LRANGE [键] 0 -1        # 查看所有元素
LRANGE [键] 0 0         # 查看第一个元素
LRANGE [键] -1 -1       # 查看最后一个元素

# 获取列表的长度
LLEN [键]
```

::: details 例子：列表类型键值对的`RPUSH`、`LPUSH`、`LPOP`、`RPOP`、`LRANGE`、`LLEN`操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> RPUSH xxx a b c                             # [!code hl:25]
(integer) 3
127.0.0.1:6379> LPUSH xxx 1 2 3
(integer) 6
127.0.0.1:6379> LRANGE xxx 0 -1
1) "3"
2) "2"
3) "1"
4) "a"
5) "b"
6) "c"
127.0.0.1:6379> LPOP xxx 3
1) "3"
2) "2"
3) "1"
127.0.0.1:6379> LRANGE xxx 0 -1
1) "a"
2) "b"
3) "c"
127.0.0.1:6379> RPOP xxx 3
1) "c"
2) "b"
3) "a"
127.0.0.1:6379> LRANGE xxx 0 -1
(empty array)
```

:::

---

### 哈希 ( Hash )

用于存储字段与值的映射 ( 类似于字典、对象 )

```zsh
# 添加字段与值的映射，若不存在则先创建后追加
HSET [键] [字段] [值]
HSET [键] [字段1] [字段1的值] [字段2] [字段2的值]

# 获取字段对应的值
HGET [键] [字段]

# 获取所有的字段与值
HGETALL [键]

# 获取所有的字段
HKEYS [键]

# 获取所有的字段的长度
HLEN [键]

# 删除字段与值的映射
HDEL [键] [字段]
HDEL [键] [字段1] [字段2] [字段3]

# 删除哈希
DEL [键]
```

::: details 例子：列表类型键值对的`HSET`、`HGET`、`HGETALL`、`HDEL`操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> HSET person name Andy age 28                # [!code hl:19]
(integer) 2
127.0.0.1:6379> HSET person skills '["Python", "JavaScript"]'
(integer) 1
127.0.0.1:6379> HGETALL person
1) "name"
2) "Andy"
3) "age"
4) "28"
5) "skills"
6) "[\"Python\", \"JavaScript\"]"
127.0.0.1:6379> HGET person skills
"[\"Python\", \"JavaScript\"]"
127.0.0.1:6379> HGET person name
"Andy"
127.0.0.1:6379> HDEL xxx name age skills
(integer) 0
127.0.0.1:6379> HGETALL xxx
(empty array)
```

:::

---

### 集合 ( Set )

是无序的且各个元素是唯一的

```zsh
# 添加元素，若不存在则先创建后追加
SADD [键] [元素]
SADD [键] [元素1] [元素2] [元素3]

# 获取所有元素
SMEMBERS [键]

# 删除元素
SREM [键] [元素]
SREM [键] [元素1] [元素2] [元素3]

# 删除集合
DEL [键]

# 判断一个元素是否存在与集合中
SISMEMBER [键] [元素]

# 求两个集合的并集
SUNION [键1] [键2]

# 求两个集合的交集
SINTER [键1] [键2]
```

::: details 例子：列表类型键值对的`SADD`、`SMEMBERS`、`SREM`操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> SADD xxx 1 2 3                             # [!code hl:16]
(integer) 3
127.0.0.1:6379> SMEMBERS xxx
1) "1"
2) "2"
3) "3"
127.0.0.1:6379> SADD xxx 1 2 3
(integer) 0
127.0.0.1:6379> SMEMBERS xxx
1) "1"
2) "2"
3) "3"
127.0.0.1:6379> SREM xxx 1 2 3
(integer) 3
127.0.0.1:6379> SMEMBERS xxx
(empty array)
```

:::

---

### 有序集合 ( SortedSet )

是有序的且各个元素是唯一的

每一个元素都会关联一个数值，并根据该数值对元素从小到大进行排序

```zsh
# 添加元素，若不存在则先创建后追加
ZADD [键] [数值] [元素]
ZADD [键] [元素1的数值] [元素1] [元素2的数值] [元素2]

# 获取指定范围的元素
ZRANGE [键] [开始索引] [结束索引]                 # 按数值从小到大
ZREVRANGE [键] [开始索引] [结束索引]              # 按数值从大到小
ZRANGE xxx 0 -1
ZREVRANGE xxx 0 -1

# 获取指定范围的元素以及其数值
ZRANGE [键] [开始索引] [结束索引] WITHSCORES      # 按数值从小到大
ZREVRANGE [键] [开始索引] [结束索引] WITHSCORES   # 按数值从大到小

# 获取指定元素的数值
ZSCORE [键] [元素]

# 删除元素
ZREM [键] [元素]
ZREM [键] [元素1] [元素2] [元素3]

# 删除有序集合
DEL [键]
```

::: details 例子：列表类型键值对的`ZADD`、`ZRANGE`、`ZRANGE`、`ZREM`操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> ZADD xxx 90 Andy 88 Jack 92 Amy             # [!code hl:14]
(integer) 3
127.0.0.1:6379> ZRANGE xxx 0 -1
1) "Jack"
2) "Andy"
3) "Amy"
127.0.0.1:6379> ZREVRANGE xxx 0 -1
1) "Amy"
2) "Andy"
3) "Jack"
127.0.0.1:6379> ZREM xxx Andy Jack Amy
(integer) 3
127.0.0.1:6379> ZRANGE xxx 0 -1
(empty array)
```

:::

::: details 例子：列表类型键值对的`ZSCORE`、`ZRANGE`、`ZRANGE`操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> ZADD xxx 90 Andy 88 Jack 92 Amy             # [!code hl:18]
(integer) 3
127.0.0.1:6379> ZSCORE xxx Amy
"92"
127.0.0.1:6379> ZRANGE xxx 0 -1 WITHSCORES
1) "Jack"
2) "88"
3) "Andy"
4) "90"
5) "Amy"
6) "92"
127.0.0.1:6379> ZREVRANGE xxx 0 -1 WITHSCORES
1) "Amy"
2) "92"
3) "Andy"
4) "90"
5) "Jack"
6) "88"
```

:::

---

### 流 ( Stream )

可以实现轻量级的消息队列

```zsh
# 添加字段与值，若不存在则先创建后追加
XADD [键] [ID] [数值] [元素]
XADD [键] * [数值] [元素]                 # 使用自动生成的ID
XADD [键] [自定义数值-0] [数值] [元素]      # 使用自定义ID

# 获取指定范围的字段与值
XRANGE [键] [开始索引] [结束索引]
XRANGE [键] - +

# 获取所有的字段与值的长度
XLEN [键]

# 删除字段与值
HDEL [键] [ID]
HDEL [键] [ID1] [ID2] [ID3]

# 删除流
DEL [键]

# 读取字段与值
XREAD COUNT [读取个数] BLOCK [获取数据前最大等待毫秒数] STREAMS [键] [开始索引]
XREAD COUNT [读取个数] BLOCK [获取数据前最大等待毫秒数] STREAMS [键] $  # 实时读取最新数据
```

::: details 例子：Steam 流类型键值对的`XADD`、`XRANGE`、`XLEN`、`XDEL`操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> XADD xxx * message 111                      # [!code hl:20]
"1736768893854-0"
127.0.0.1:6379> XADD xxx * message 444
"1736768913446-0"
127.0.0.1:6379> XADD xxx 99999-0 message 999
(error) ERR The ID specified in XADD is equal or smaller than the target stream top item
127.0.0.1:6379> XADD xxx 9999999999999-0 message 999
"9999999999999-0"
127.0.0.1:6379> XLEN xxx
(integer) 3
127.0.0.1:6379> XRANGE xxx - +
1) 1) "1736768893854-0"
   2) 1) "message"
      2) "111"
2) 1) "1736768913446-0"
   2) 1) "message"
      2) "444"
3) 1) "9999999999999-0"
   2) 1) "message"
      2) "999"
127.0.0.1:6379> XDEL xxx 1736768893854-0 1736768913446-0 9999999999999-0
(integer) 3
127.0.0.1:6379> XRANGE xxx - +
(empty array)
```

:::

::: details 例子：Steam 流类型键值对的`XREAD`读取指定个数的操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> XADD xxx * message 111                      # [!code hl:17]
"1736769309213-0"
127.0.0.1:6379> XADD xxx * message 444
"1736769313134-0"
127.0.0.1:6379> XADD xxx * message 999
"1736769320331-0"
127.0.0.1:6379> XREAD COUNT 2 BLOCK 1000 STREAMS xxx 0
1) 1) "xxx"
   2) 1) 1) "1736768893854-0"
         2) 1) "message"
            2) "111"
      2) 1) "1736768913446-0"
         2) 1) "message"
            2) "444"
127.0.0.1:6379> XREAD COUNT 1 BLOCK 2000 STREAMS xxx $
(nil)
(2.08s)
```

:::

::: details 例子：Steam 流类型键值对的`XREAD`实时读取最新数据的操作

::: code-group

```zsh [读取数据的终端]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
# 第一次读取                                                    # [!code hl:17]
# 最大等待 5s，再次期间内若有最新数据则直接打印
127.0.0.1:6379> XREAD COUNT 1 BLOCK 5000 STREAMS xxx $
1) 1) "xxx"
   2) 1) 1) "1736769909484-0"
         2) 1) "message"
            2) "111"
(1.78s)
127.0.0.1:6379> XREAD COUNT 1 BLOCK 5000 STREAMS xxx $
# 第二次读取
# 没有最新数据被增加，等待 5s 之后打印 nil
(nil)
(5.04s)
```

```zsh [追加数据的终端]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
# 在第一次读取命令的等待时间内执行                                  # [!code hl:17]
127.0.0.1:6379> XADD xxx * message 111
# 在第一次读取命令的等待时间内不做任何处理
```

:::

---

### 地理空间 ( Geospatial )

用于地理位置相关的操作

```zsh
# 添加地理位置，若不存在则先创建后追加
GEOADD [键] [经度] [纬度] [地理位置名称]

# 获取存储的地理位置的经度纬度
GEOPOS [键] [地理位置名称]
GEOPOS [键] [地理位置名称1] [地理位置名称2] [地理位置名称3]

# 计算存储的两个地理位置之间的直线距离
GEODIST [键] [地理位置名称1] [地理位置名称2] [距离单位]     # 默认单位是 m
GEODIST [键] [地理位置名称1] [地理位置名称2] km

# 计算存储的地理位置半径距离内的成员
GEOSEARCH [键] FROMMEMBER [地理位置名称] BYRADIUS [距离数值] [距离单位]
```

::: details 例子：地理空间类型键值对的`GEOADD`、`GEOPOS`、`GEODIST`、`GEOSEARCH`操作

::: code-group

```zsh [Docker]
% docker run --name study_redis -p 6379:6379 -d --rm redis
% docker exec -it study_redis bash
root@[自定义容器ID]:/data# redis-cli
127.0.0.1:6379> GEOADD xxx 139.6917 35.6895 tokyo           # [!code hl:20]
(integer) 1
127.0.0.1:6379> GEOADD xxx 135.5022 34.6937 osaka
(integer) 1
127.0.0.1:6379> GEOADD cities 135.7681 35.0116 kyoto
(integer) 1
127.0.0.1:6379> GEOPOS xxx tokyo osaka kyoto
1) 1) "139.69170123338699341"
   2) "35.68950126697936298"
2) 1) "135.50219804048538208"
   2) "34.69370057343682845"
3) 1) "135.76810151338577271"
   2) "35.01160023179880199"
127.0.0.1:6379> GEODIST xxx tokyo osaka km
"396.5565"
127.0.0.1:6379> GEODIST xxx tokyo kyoto km
"363.8165"
127.0.0.1:6379> GEOSEARCH xxx FROMMEMBER tokyo BYRADIUS 380 km
1) "kyoto"
2) "tokyo"
```

:::

---

### HyperLogLog

用于做基数统计

- 精确度不高 ( 近值 )
- 占内存极少，适合做大规模操作 ( 比如 UV 统计、搜索次数 )

TODO:

---

### 位图 ( Bitmap )

TODO:

---

### 位域 ( Bitfield )

TODO:

<!-- ## 相关链接

- [Redis 缓存策略](https://www.bilibili.com/video/BV16hyNYAEw6?spm_id_from=333.788.player.switch&vd_source=8960252a3845b76b699282b11f36ab5c)
- [一小时Redis教程](https://www.bilibili.com/video/BV1Jj411D7oG?spm_id_from=333.788.player.switch&vd_source=8960252a3845b76b699282b11f36ab5c&p=13)
- [redis是什么，架构设计是怎么样的](https://www.bilibili.com/video/BV18jBiYpEDJ/?spm_id_from=333.1007.tianma.8-1-27.click) -->
