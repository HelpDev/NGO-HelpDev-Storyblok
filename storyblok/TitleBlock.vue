<script setup>
import { Container } from '@papanasi/vue';
const storyblokApi = useStoryblokApi();

const props = defineProps({ blok: Object });

const variantColors = {
  basic: {
    foreground: 'var(--color-basic-darkest)'
  },
  primary: {
    foreground: 'var(--color-primary-darkest)'
  },
  secondary: {
    foreground: 'var(--color-secondary-darkest)'
  },
  tertiary: {
    foreground: 'var(--color-tertiary-darkest)'
  }
};

const richtext = ref(storyblokApi.richTextResolver.render(props.blok.subtitle));
const direction = ref(props.blok.side === 'center' ? 'column' : props.blok.side === 'left' ? 'row' : 'row-reverse');
const foreground = ref(variantColors[props.blok.variant].foreground);
</script>

<template>
  <Container class="title">
    <h2 v-if="blok.title" class="title__main">{{ blok.title }}</h2>
    <p v-if="richtext.length > '<p></p>'.length" class="title__subtitle" v-html="richtext"></p>
  </Container>
</template>

<style scoped>
.title {
  --direction: v-bind(direction);
  --foreground: v-bind(foreground);

  color: var(--foreground);
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;

  @media (--breakpoint-m) {
    flex-direction: var(--direction);
  }

  &__main,
  &__subtitle {
    margin: 0;
    padding: 3vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (--breakpoint-m) {
      width: 50%;
      text-align: left;
    }
  }

  &__main {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);

    @media (--breakpoint-m) {
      font-size: var(--font-size-xxl);
    }
  }

  &__subtitle {
    opacity: 0.8;
    font-size: var(--font-size-m);

    @media (--breakpoint-m) {
      font-size: var(--font-size-l);
    }
  }
}
</style>
