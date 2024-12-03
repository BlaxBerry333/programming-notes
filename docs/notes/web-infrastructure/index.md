---
layout: home

hero:
  name: Web Infrastructure
  text: 基础设施
  tagline: BlaxBerry 的个人编程学习笔记
  image:
    src: /static/cartoon-images/hero--captainmarvel.webp
    alt: picture
---

<script setup lang="ts">
import SkillTextLinksBlock from '../../components/SkillTextLinksBlock.vue'
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'


const __OPERATING_SYSTEM__ = [
    { 
        name: "Shell", 
        link: "/notes/web-infrastructure/operating-system/shell/", 
        imgSrc: "/static/skill-icons/web-infrastructure--shell.png"
    },
]

const __CONTAINERIZATION__ = [
    { 
        name: "Docker", 
        link: "/notes/web-infrastructure/containerization/docker/", 
        imgSrc: "/static/skill-icons/web-infrastructure--docker.png"
    },
    { 
        name: "Docker Compose", 
        link: "/notes/web-infrastructure/containerization/docker-compose/", 
        imgSrc: "/static/skill-icons/web-infrastructure--docker-compose.png"
    },
    { 
        name: "Kubernetes", 
        link: "/notes/web-infrastructure/containerization/kubernetes/", 
        imgSrc: "/static/skill-icons/web-infrastructure--kubernetes.png"
    }
]

const __CI_CD__ = [
    { 
        name: "GitLab CI/CD", 
        link: "https://gitlab-docs.creationline.com/ee/ci/yaml/#keywords", 
        imgSrc: "/static/skill-icons/web-infrastructure--gitlab-cicd.png",
        openNewTag: true
    },
    { 
        name: "GitHub Actions", 
        link: "https://docs.github.com/zh/actions", 
        imgSrc: "/static/skill-icons/web-infrastructure--github-actions.png",
        openNewTag: true
    }
]
</script>

## 操作系统

<SkillIconsBlock :skillList="__OPERATING_SYSTEM__"/>

## 容器化

<SkillIconsBlock :skillList="__CONTAINERIZATION__"/>

## CI/CD 与自动部署

<SkillIconsBlock :skillList="__CI_CD__"/>

<!-- ## 网络基础

OSI 模型、TCP/IP 协议栈、IPv4/IPv6、子网划分

### 网络协议

网络层与传输层协议: TCP、UDP、IP、ICMP

应用层协议: HTTP/HTTPS、FTP、DNS、SMTP、WebSocket

### 网络安全

加密（对称、非对称、哈希算法）、SSL/TLS、HTTPS

## 负载均衡

Nginx、HAProxy、LVS、负载均衡算法 -->
