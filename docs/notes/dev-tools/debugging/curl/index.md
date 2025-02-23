---
prev: false
next: false
---

# curl

![](/static/skill-images/dev-tools--curl.png)

## 下载安装

::: code-group

```zsh [Homebrew]
% brew install curl
```

:::

> 如下：本文使用的 curl v7.86.0

```zsh
% curl --version      # [!code focus]
curl 7.86.0 (x86_64-apple-darwin22.0) libcurl/7.86.0 (SecureTransport) LibreSSL/3.3.6 zlib/1.2.11 nghttp2/1.47.0
Release-Date: 2022-10-26
Protocols: dict file ftp ftps gopher gophers http https imap imaps ldap ldaps mqtt pop3 pop3s rtsp smb smbs smtp smtps telnet tftp
Features: alt-svc AsynchDNS GSS-API HSTS HTTP2 HTTPS-proxy IPv6 Kerberos Largefile libz MultiSSL NTLM NTLM_WB SPNEGO SSL threadsafe UnixSockets
```

## 请求

```zsh
# GET
% curl [URL]

# POST
% curl -X POST [URL] \
    -d "属性1=值&属性2=值"
```

## 请求头

```zsh
% curl -H "Content-Type: application/json" \
       -H "Authorization: Bearer TOKEN" \
       [URL]
```

<!-- ## 相关链接

- [常用命令](https://mp.weixin.qq.com/s/TN2XUPtCIqV3KDe3-hezEQ) -->
