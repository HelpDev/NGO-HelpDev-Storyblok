<script setup>
import { Column, Container, Row } from '@papanasi/vue';
const storyblokApi = useStoryblokApi();
const { locale } = useI18n();

const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url',
  language: locale.value
});

const headerMenu = ref(data.story.content.header_menu);
</script>

<template>
  <Container :fluid="true" class="header">
    <Row basic="column" s="row" class="header__container">
      <Column :s="2" class="header__column">
        <NuxtLink to="/">
          <img
            class="header__logo"
            src="~/assets/images/logo_landscape_white.png"
            :alt="data.story.content.title"
            width="200"
          />
        </NuxtLink>
      </Column>
      <Column class="header__column">
        <nav v-if="headerMenu" class="header__nav">
          <ul class="header__menu">
            <li v-for="blok in headerMenu" :key="blok._uid" class="header__link">
              <NuxtLink
                :to="
                  blok.link.cached_url.includes('index')
                    ? blok.link.cached_url.replace('index', '/')
                    : blok.link.cached_url
                "
              >
                {{ blok.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </Column>
      <Column :s="2" class="header__column"> Lang </Column>
    </Row>
  </Container>
</template>

<style scoped>
.header {
  position: absolute;
  top: 1rem;
  height: var(--header-height);

  @media (--breakpoint-s) {
    top: 0;
  }

  &__container {
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: var(--pa-grid-container-max-width);
    width: 90vw;
    height: var(--header-height);
  }

  &__logo {
    max-width: 8rem;

    @media (--breakpoint-s) {
      max-width: 13rem;
    }
  }

  &__column {
    justify-content: center;
    align-items: center;
  }

  &__nav,
  &__menu {
    padding: 0;
    margin: 0;
    width: 100%;
  }

  &__menu {
    display: flex;
    justify-content: center;
    list-style: none;
  }
}
</style>
