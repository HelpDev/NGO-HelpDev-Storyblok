<script setup>
import { Column, Container, Row } from '@papanasi/vue';
const storyblokApi = useStoryblokApi();
const { locale } = useI18n();

const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url',
  language: locale.value
});

const title = ref(data.story.content.footer_title);
const subtitle = ref(data.story.content.footer_subtitle);
const thanks = ref(data.story.content.footer_thanks);
const social = ref(data.story.content.social);

const iconTemplate = (icon) => {
  return `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${icon}.svg`;
};
</script>

<template>
  <Container :fluid="true" class="footer">
    <Container class="footer__container">
      <Row basic="column" s="row">
        <Column class="footer__column" :basic="full" :s="8">
          <h4 class="footer__title">{{ title }}</h4>
          <h5 class="footer__subtitle">{{ subtitle }}</h5>
        </Column>

        <Column class="footer__column" :basic="full" :s="4">
          <h4 class="footer__title footer__title--thanks">{{ thanks }}</h4>
          <NuxtLink to="https://helpdev.org" target="_blank">
            <img class="footer__logo" src="~/assets/images/helpdev.png" :alt="data.story.content.title" width="200" />
          </NuxtLink>
          <NuxtLink to="https://www.storyblok.com/" target="_blank">
            <img class="footer__logo" src="~/assets/images/storyblok.png" :alt="data.story.content.title" width="200" />
          </NuxtLink>
        </Column>
      </Row>
    </Container>
  </Container>
</template>

<style scoped>
.footer {
  background-color: var(--color-primary-normal);
  padding: 0 1rem 1.25rem 1rem;

  &__container {
    color: var(--color-basic-brightest);
    margin: 0 auto;
  }

  &__column {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-l);
    font-weight: var(--font-weight-bold);
    display: block;
    margin: 0;

    @media (--breakpoint-s) {
      font-size: var(--font-size-xl);
    }

    @media (--breakpoint-m) {
      max-width: 35rem;
    }

    &--thanks {
      padding-bottom: 1rem;
    }
  }

  &__subtitle {
    padding-top: 0.5rem;
    opacity: 0.8;
    color: var(--color-basic-brightest);
    font-size: var(--font-size-s);
    line-height: calc(var(--font-size-s) * 1.5);
    max-width: 80%;
    display: block;
    margin: 0;

    @media (--breakpoint-s) {
      font-size: var(--font-size-m);
      line-height: calc(var(--font-size-m) * 1.5);
      font-weight: var(--font-weight-light);
    }

    @media (--breakpoint-m) {
      max-width: 40rem;
    }
  }

  &__logo {
    max-width: 6rem;

    @media (--breakpoint-s) {
      max-width: 9rem;
    }
  }
}
</style>
