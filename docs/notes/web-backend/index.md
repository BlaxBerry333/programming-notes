---
layout: home

hero:
  name: Web Backend Dev
  text: 后端开发
  tagline: BlaxBerry 的个人编程学习笔记
  image:
    src: /static/cartoon-images/hero--spiderman.png
    alt: picture
---

<script setup lang="ts"> 
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'


const __NODEJS_AND_RELATED_FRAMEWORKS__ = [
    { 
        name: "Node.js", 
        link: "/notes/web-backend/runtimes/node-js/", 
        imgSrc: "/static/skill-icons/web-backend--nodejs.png"
    },
    { 
        name: "Express.js", 
        link: "/notes/web-backend/runtimes/express-js/", 
        imgSrc: "/static/skill-icons/web-backend--expressjs.png"
    },
    { 
        name: "Nest.js", 
        link: "/notes/web-backend/runtimes/nest-js/", 
        imgSrc: "/static/skill-icons/web-backend--nestjs.png"
    }
]

const __PYTHON_AND_RELATED_FRAMEWORKS__ = [
    { 
        name: "Python", 
        link: "/notes/web-backend/languages/python/", 
        imgSrc: "/static/skill-icons/web-backend--python.png"
    },
    { 
        name: "Django", 
        link: "/notes/web-backend/languages/django/", 
        imgSrc: "/static/skill-icons/web-backend--django.png"
    }
]
</script>

## 编程语言与其开发框架

<SkillIconsBlock :skillList="__NODEJS_AND_RELATED_FRAMEWORKS__"/>
<SkillIconsBlock :skillList="__PYTHON_AND_RELATED_FRAMEWORKS__"/>

## API 开发

RESTful API、GraphQL、gRPC、WebSockets

## 身份验证与授权

OAuth 2.0、JWT、OAuth、Passport.js、Session/Cookie

## 架构设计

微服务架构、单体架构、Serverless、消息队列（RabbitMQ、Kafka）
