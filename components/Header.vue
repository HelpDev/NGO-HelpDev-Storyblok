<script setup>
import { Button, Column, Container, Row } from '@papanasi/vue';
const storyblokApi = useStoryblokApi();
const { locale } = useI18n();

const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url',
  language: locale.value
});

const menu = ref(data.story.content.menu);
const actions = ref(data.story.content.actions);
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
        <nav v-if="menu" class="header__nav">
          <ul class="header__menu">
            <li v-for="blok in menu" :key="blok._uid">
              <NuxtLink
                class="header__link"
                :to="
                  blok.link.cached_url.includes('index')
                    ? blok.link.cached_url.replace('index', locale === 'en' ? '/' : '')
                    : blok.link.cached_url
                "
              >
                {{ blok.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </Column>
      <Column :s="2" class="header__column">
        <ul class="header__menu">
          <li v-for="blok in actions" :key="blok._uid">
            <NuxtLink
              class="header__link"
              :target="blok.link.target"
              :to="
                blok.link.cached_url.includes('index')
                  ? blok.link.cached_url.replace('index', locale === 'en' ? '/' : '')
                  : blok.link.cached_url
              "
            >
              <Button class="header__button" :outline="true" variant="basic">{{ blok.title }}</Button>
            </NuxtLink>
          </li>
        </ul>
      </Column>
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

  &__link {
    color: var(--color-basic-brightest);
    font-family: var(--font-family-heading);
    font-weight: var(--font-weight-medium);
    text-align: center;
    transition: color var(--transition-duration-normal);
    max-width: 80%;
    margin: 0 1rem;

    &:hover {
      color: var(--color-primary-brightest);
    }

    @media (--breakpoint-s) {
      font-size: var(--font-size-l);
      margin: 0 2rem;
    }
  }

  &__button {
    --pa-border-width-small: 3px;
    --pa-button-radius: 100rem;

    background-color: transparent;
    color: var(--color-basic-brightest);
    border-color: var(--color-basic-brightest);
    transition: opacity var(--transition-duration-normal);

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
