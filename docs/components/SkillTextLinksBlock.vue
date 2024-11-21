<script setup lang="ts">
import { toRefs } from "vue";
import { withBase } from "vitepress";

interface SkillTextLinkCard {
  name: string;
  link: string;
  imgSrc?: string;
  openNewTag?: boolean; // 在新的浏览器标签中打开链接 ( 多用于外部连接 )
}

const props = defineProps({
  textList: Array<SkillTextLinkCard>,
});

const { textList } = toRefs(props);
</script>

<template>
  <ul class="skill-text-links-block" v-if="!!textList?.length">
    <a
      v-for="(item, index) in textList"
      :key="index"
      :href="item.link"
      :target="item.openNewTag ? '_blank' : '_self'"
      rel="noopener noreferrer"
    >
      <li class="skill-text-card">
        <img
          v-if="item.imgSrc"
          :src="withBase(item.imgSrc)"
          :alt="item.name"
          loading="lazy"
          class="skill-img"
        />
        <strong class="skill-title" translate="no">
          {{ item.name }}
        </strong>

        <i class="external-link" v-if="item.openNewTag">
          {{ " ↗ " }}
        </i>
      </li>
    </a>
  </ul>
</template>

<style lang="scss">
ul.skill-text-links-block {
  padding: 0;
  margin: 0;
  margin-top: 28px;
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
  }

  & > a {
    text-decoration: none;
    color: inherit;

    &:hover {
      color: inherit;
    }
  }

  li.skill-text-card {
    position: relative;
    list-style: none;
    display: flex;
    align-items: center;
    min-width: 200px;
    padding: 28px 28px;
    border-radius: 14px;
    border: transparent 1px solid;
    cursor: pointer;
    height: 80px;
    position: relative;
    background-color: var(--vp-c-bg-soft);
    box-shadow: var(--vp-shadow-4);

    &:hover {
      border-color: var(--vp-c-brand-1);
      color: var(--vp-c-brand-1);

      &::after {
        filter: blur(10px);
      }
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      inset: 0;
      border-radius: inherit;
      transform: translateZ(-1px);
      pointer-events: none;
      transition: filter 0.3s ease;
      background-clip: content-box !important;
      background: -webkit-linear-gradient(123deg, #d600ba, #6842ff, #007e94);
    }

    img.skill-img {
      height: 50px;
      width: 50px;
      margin-right: 18px;
    }

    strong.skill-title {
      font-size: 14px;
      line-height: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 590px) {
        width: 300px;
      }
      @media (min-width: 591px) and (max-width: 1199px) {
        width: 500px;
      }
      @media (min-width: 1200px) {
        width: 500px;
      }
    }

    i.external-link {
      position: absolute;
      top: 0px;
      right: 6px;
      color: var(--vp-c-brand-1);
      font-size: 12px;
      font-weight: 600;
    }
  }
}
</style>
