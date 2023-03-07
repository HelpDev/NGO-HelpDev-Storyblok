<script setup>
import { Container } from '@papanasi/vue';
const storyblokApi = useStoryblokApi();

const props = defineProps({ blok: Object });

const variantColors = {
  transparent: {
    foreground: 'transparent'
  },
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0 auto;

  color: var(--foreground);

  @media (--breakpoint-m) {
    flex-direction: var(--direction);
  }

  &__main,
  &__subtitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1vw;
    margin: 0;
    text-align: center;

    @media (--breakpoint-m) {
      width: 50%;
      padding: 3vw;
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
    font-size: var(--font-size-l);
    opacity: 0.8;
  }
}
</style>
