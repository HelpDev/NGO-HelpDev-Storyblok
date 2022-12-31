<script setup>
import { CardSize, CardVariant } from '~/helpers';
const storyblokApi = useStoryblokApi();

const props = defineProps({ blok: Object });

const richtext = ref(storyblokApi.richTextResolver.render(props.blok.subtitle));
const width = ref(CardSize[props.blok.size].width);
const padding = ref(CardSize[props.blok.size].padding);
const background = ref(CardVariant[props.blok.variant].background);
const foreground = ref(CardVariant[props.blok.variant].foreground);
const maxHeight = ref(props.blok.size === '2' ? 'auto' : '20vmax');
const mode = ref('subscription');
</script>

<template>
  <div class="card">
    <h3 class="card__title">{{ blok.title }}</h3>
    <p class="card__subtitle" v-html="richtext"></p>

    {{ blok.onetime_check_title }} [x] {{ blok.month_check_title }}

    <StoryblokComponent
      v-for="item in blok.items"
      :key="item._uid"
      :blok="{ ...item, mode, month_button: blok.month_button }"
    />
  </div>
</template>

<style scoped>
.card {
  --margin: 0;
  --width: v-bind(width);
  --full-width: var(--width);
  --padding: v-bind(padding);
  --background: v-bind(background);
  --foreground: v-bind(foreground);
  --min-height: 20rem;
  --max-height: v-bind(maxHeight);

  background-color: var(--background);
  color: var(--foreground);
  width: 100%;
  padding: var(--padding);
  margin-top: 0.5rem;
  min-height: var(--min-height);
  max-height: var(--max-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: v-bind(align);

  @media (--breakpoint-m) {
    width: var(--full-width);
    margin-right: var(--margin);
  }

  &__title {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 2rem;

    @media (--breakpoint-s) {
      font-size: var(--font-size-xxl);
    }
  }
}
</style>
