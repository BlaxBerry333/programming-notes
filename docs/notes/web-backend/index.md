---
layout: home

hero:
  name: Web Backend Dev
  text: 后端开发
  tagline: BlaxBerry 的个人编程学习笔记
  image:
    src: /static/cartoon-images/hero--spiderman.webp
    alt: picture
---

<script setup lang="ts"> 
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'


const __NODEJS_AND_RELATED_FRAMEWORKS__ = [
    { 
        name: "Node.js", 
        link: "/notes/web-backend/runtimes/nodejs/", 
        imgSrc: "/static/skill-icons/web-backend--nodejs.png"
    },
    { 
        name: "Express.js", 
        link: "/notes/web-backend/frameworks/expressjs/", 
        imgSrc: "/static/skill-icons/web-backend--expressjs.png"
    },
    { 
        name: "Nest.js", 
        link: "/notes/web-backend/frameworks/nestjs/", 
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
        link: "/notes/web-backend/frameworks/django/", 
        imgSrc: "/static/skill-icons/web-backend--django.png"
    },
    { 
        name: "Fast API", 
        link: "/notes/web-backend/frameworks/fastapi/", 
        imgSrc: "/static/skill-icons/web-backend--fastapi.png"
    }
]

const __GOLANG_AND_RELATED_FRAMEWORKS__ = [
    { 
        name: "Golang", 
        link: "/notes/web-backend/languages/golang/", 
        imgSrc: "/static/skill-icons/web-backend--golang.png"
    },
    { 
        name: "Gin", 
        link: "/notes/web-backend/frameworks/gin/", 
        imgSrc: "/static/skill-icons/web-backend--gin.png"
    }
]

// const __RUBY_AND_RELATED_FRAMEWORKS__ = [
//     { 
//         name: "Ruby", 
//         link: "/notes/web-backend/languages/ruby/", 
//         imgSrc: "/static/skill-icons/web-backend--ruby.png"
//     },
//     { 
//         name: "Ruby On Rails", 
//         link: "/notes/web-backend/frameworks/ruby-on-rails/", 
//         imgSrc: "/static/skill-icons/web-backend--ruby-on-rails.png"
//     }
// ]

// const __RUST_AND_RELATED_FRAMEWORKS__ = [
//     { 
//         name: "Rust", 
//         link: "/notes/web-backend/languages/rust/", 
//         imgSrc: "/static/skill-icons/web-backend--rust.png"
//     },
//     { 
//         name: "Actix Web", 
//         link: "https://actix.rs/", 
//         imgSrc: "/static/skill-icons/web-backend--rust.png",
//         openNewTag: true
//     }
// ]

const __API__ = [
    { 
        name: "Rest API", 
        link: "/notes/web-backend/api/restapi/", 
        imgSrc: "/static/skill-icons/web-backend--restapi.png"
    },
    { 
        name: "GraphQL", 
        link: "/notes/web-backend/api/graphql/", 
        imgSrc: "/static/skill-icons/web-backend--graphql.png"
    },
    { 
        name: "gRPC", 
        link: "https://grpc.io/", 
        imgSrc: "/static/skill-icons/web-backend--grpc.png",
        openNewTag: true
    },    
    { 
        name: "tRPC", 
        link: "https://trpc.io/", 
        imgSrc: "/static/skill-icons/web-backend--trpc.png",
        openNewTag: true
    },  
    { 
        name: "Protocol Buffers",
        link: "/notes/web-backend/api/protobuf/", 
        imgSrc: "/static/skill-icons/web-backend--protobuf.png",
    },
    { 
        name: "WebSocket", 
        link: "/notes/web-backend/api/websocket/", 
        imgSrc: "/static/skill-icons/web-backend--websocket.png"
    },
]

const __AUTHENTICATION_AUTHORIZATION__ = [
    { 
        name: "JWT", 
        link: "https://qiita.com/asagohan2301/items/cef8bcb969fef9064a5c", 
        imgSrc: "/static/skill-icons/web-backend--jwt.png",
        openNewTag: true
    },
    { 
        name: "OAuth", 
        link: "https://oauth.net/2/", 
        imgSrc: "/static/skill-icons/web-backend--oauth.png",
        openNewTag: true
    },
    
]
</script>

## 编程语言与其开发框架

<SkillIconsBlock :skillList="__NODEJS_AND_RELATED_FRAMEWORKS__"/>
<SkillIconsBlock :skillList="__PYTHON_AND_RELATED_FRAMEWORKS__"/>
<SkillIconsBlock :skillList="__GOLANG_AND_RELATED_FRAMEWORKS__"/>
<!-- <SkillIconsBlock :skillList="__RUBY_AND_RELATED_FRAMEWORKS__"/> -->
<!-- <SkillIconsBlock :skillList="__RUST_AND_RELATED_FRAMEWORKS__"/> -->

## API 开发

<SkillIconsBlock :skillList="__API__"/>

## 身份验证与权限

<SkillIconsBlock :skillList="__AUTHENTICATION_AUTHORIZATION__"/>

<!-- ## 架构设计

> Architecture Design

微服务架构、单体架构、Serverless、消息队列（RabbitMQ、Kafka） -->
