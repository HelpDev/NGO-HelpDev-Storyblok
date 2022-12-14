<script setup>
import { Column, Row } from '@papanasi/vue';
const storyblokApi = useStoryblokApi();

const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url'
});

const headerMenu = ref(null);

headerMenu.value = data.story.content.header_menu;
</script>

<template>
  <Row class="header">
    <Column>
      <NuxtLink to="/">
        <h1>Storyblok Nuxt</h1>
      </NuxtLink>
    </Column>
    <Column>
      <nav v-if="headerMenu">
        <ul>
          <li v-for="blok in headerMenu" :key="blok._uid">
            <NuxtLink
              :to="
                blok.link.cached_url.includes('index')
                  ? blok.link.cached_url.replace('index', '/')
                  : blok.link.cached_url
              "
            >
              {{ blok.link.story.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Column>
  </Row>
</template>

<style scoped>
.header {
  background-color: var(--color-primary-300);
}
</style>
