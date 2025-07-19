---
layout: home

hero:
  name: Web Backend Dev
  text: 后端开发
  tagline: 基础知识 & 经验总结
  image:
    src: /static/cartoon-images/hero--spiderman.webp
    alt: picture
---

<script setup lang="ts"> 
import SkillIconsBlock from '../../components/SkillIconsBlock.vue'

const __LANGUAGES_AND_RELATED_FRAMEWORKS__ = {
    ['__NODEJS__']: [
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
    ],

    ['__PYTHON__']: [
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
            name: "Django REST Framework", 
            link: "/notes/web-backend/frameworks/django-rest-framework/", 
            imgSrc: "/static/skill-icons/web-backend--django-rest-framework.png"
        },
    ],

    ['__GOLANG__']: [
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
    ],

    ['__RUBY__']: [
        { 
            name: "Ruby", 
            link: "/notes/web-backend/languages/ruby/", 
            imgSrc: "/static/skill-icons/web-backend--ruby.png"
        },
        { 
            name: "Ruby On Rails", 
            link: "/notes/web-backend/frameworks/ruby-on-rails/", 
            imgSrc: "/static/skill-icons/web-backend--ruby-on-rails.png"
        }
    ],

    ['__RUST__']: [
        { 
            name: "Rust", 
            link: "/notes/web-backend/languages/rust/", 
            imgSrc: "/static/skill-icons/web-backend--rust.png"
        },
        { 
            name: "Actix Web", 
            link: "https://actix.rs/", 
            imgSrc: "/static/skill-icons/web-backend--actix-web.png",
            openNewTag: true
        }
    ]
}

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
        name: "tRPC", 
        link: "/notes/web-backend/api/trpc/", 
        imgSrc: "/static/skill-icons/web-backend--trpc.png",
    },
    // { 
    //     name: "gRPC",  
    //     link: "https://grpc.io/", 
    //     imgSrc: "/static/skill-icons/web-backend--grpc.png",
    //     openNewTag: true
    // },  
    // { 
    //     name: "WebSocket", 
    //     link: "/notes/web-backend/api/websocket/", 
    //     imgSrc: "/static/skill-icons/web-backend--websocket.png"
    // },
]

const __DATABASES_OOS__ = {
    ['__SQL__']: [
        { 
            name: "MySQL", 
            link: "/notes/web-backend/database/mysql/", 
            imgSrc: "/static/skill-icons/database--mysql.png"
        },
        { 
            name: "PostgreSQL", 
            link: "/notes/web-backend/database/postgresql/", 
            imgSrc: "/static/skill-icons/database--postgresql.png"
        },
    ],
    ['__NO_SQL__']: [
        { 
            name: "MongoDB", 
            link: "/notes/web-backend/database/mongodb/", 
            imgSrc: "/static/skill-icons/database--mongodb.png"
        },
        { 
            name: "Redis", 
            link: "/notes/web-backend/database/redis/", 
            imgSrc: "/static/skill-icons/database--redis.png"
        },
    ],
    ['__ORM__']: [
        { 
            name: "Prisma",  
            link: "/notes/web-backend/database/prisma/", 
            imgSrc: "/static/skill-icons/database--prisma.png", 
        }
    ],
    ['__OOS__']: [
        {
            name: "MinIO", 
            link: "/notes/web-backend/database/minio/", 
            imgSrc: "/static/skill-icons/web-database--minio.png"
        }
    ]
}

const __AUTH__ = [
    { 
        name: "SpiceDB ", 
        link: "/notes/web-backend/auth/spicedb/", 
        imgSrc: "/static/skill-icons/web-backend--spicedb.png"
    },
    { 
        name: "Keycloak", 
        link: "/notes/web-backend/auth/keycloak/", 
        imgSrc: "/static/skill-icons/web-backend--keycloak.png"
    },
]
</script>

## 编程语言与框架

<SkillIconsBlock :skillList="__LANGUAGES_AND_RELATED_FRAMEWORKS__['__PYTHON__']"/>
<SkillIconsBlock :skillList="__LANGUAGES_AND_RELATED_FRAMEWORKS__['__GOLANG__']"/>
<!-- <SkillIconsBlock :skillList="__LANGUAGES_AND_RELATED_FRAMEWORKS__['__NODEJS__']"/> -->
<!-- <SkillIconsBlock :skillList="__LANGUAGES_AND_RELATED_FRAMEWORKS__['__RUBY__']"/> -->
<SkillIconsBlock :skillList="__LANGUAGES_AND_RELATED_FRAMEWORKS__['__RUST__']"/>

## API 开发

<SkillIconsBlock :skillList="__API__"/>

## 数据库与存储

<!-- ### 关系型数据库 -->
<!-- > Relational Database -->
<SkillIconsBlock :skillList="__DATABASES_OOS__['__SQL__']"/>
<!-- ### 非关系型数据库 -->
<!-- > Non-Relational Database ( NoSQL Database ) -->
<SkillIconsBlock :skillList="__DATABASES_OOS__['__NO_SQL__']"/>
<!-- ### 对象关系映射 -->
<!-- > Object Relational Mapping ( ORM ) -->
<SkillIconsBlock :skillList="__DATABASES_OOS__['__ORM__']"/>
<!-- ### 对象存储服务 -->
<!-- > Object Storage Service ( OOS )-->
<SkillIconsBlock :skillList="__DATABASES_OOS__['__OOS__']"/>

## 验证与权限

<SkillIconsBlock :skillList="__AUTH__"/>

<!-- ## 架构设计

> Architecture Design

微服务架构、单体架构、Serverless、消息队列（RabbitMQ、Kafka） -->
