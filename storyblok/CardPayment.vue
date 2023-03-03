<script setup>
import { CardSize, CardVariant } from '~/helpers';
const storyblokApi = useStoryblokApi();
import { Vue3ToggleButton } from 'vue3-toggle-button';
import '../node_modules/vue3-toggle-button/dist/style.css'; // TODO: move to global css

const props = defineProps({ blok: Object });

const richtext = ref(storyblokApi.richTextResolver.render(props.blok.subtitle));
const width = ref(CardSize[props.blok.size].width);
const padding = ref(CardSize[props.blok.size].padding);
const background = ref(CardVariant[props.blok.variant].background);
const foreground = ref(CardVariant[props.blok.variant].foreground);
const maxHeight = ref(props.blok.size === '2' ? 'auto' : '20vmax');
const isMonth = ref(true);
const mode = ref(null);

function setMode() {
  mode.value = isMonth.value ? 'subscription' : 'payment';
}

watch([() => isMonth.value], () => {
  setMode();
});

setMode();
</script>

<template>
  <div class="card">
    <h3 class="card__title">{{ blok.title }}</h3>
    <p class="card__subtitle" v-html="richtext"></p>

    <div class="card__actions">
      <StoryblokComponent
        v-for="item in blok.items"
        :key="item._uid"
        :blok="{ ...item, mode, month_button: blok.month_button }"
      />
    </div>

    <div class="card__toggle">
      {{ blok.onetime_check_title }}
      <Vue3ToggleButton
        v-model:isActive="isMonth"
        track-height="16px"
        handle-diameter="16px"
        handle-distance="18px"
        track-width="32px"
        track-border-radius="16px"
      />
      {{ blok.month_check_title }}
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: v-bind(align);
  justify-content: center;
  width: 100%;
  min-height: var(--min-height);
  max-height: var(--max-height);
  padding: var(--padding);
  margin-top: 0.5rem;
  color: var(--foreground);

  background-color: var(--background);

  @media (--breakpoint-m) {
    width: var(--full-width);
    margin-right: var(--margin);
    margin-left: var(--margin);
  }

  &__title {
    padding-bottom: 2rem;
    margin-top: 0;
    margin-bottom: 0;
    font-family: var(--font-family-heading);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);

    @media (--breakpoint-s) {
      font-size: var(--font-size-xxl);
    }
  }

  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 1rem;
  }

  &__toggle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1rem;
    font-size: var(--font-size-s);

    :deep(.track) {
      background-color: var(--color-basic-bright);
      border-color: var(--color-basic-bright);
    }

    :deep(.handle) {
      margin-left: -2px;
      background-color: var(--color-basic-normal);
    }

    :deep(.switch) {
      margin: 0 0.25rem;
    }

    :deep(input:checked ~ .track) {
      background-color: var(--color-primary-brightest);
      border-color: var(--color-primary-brightest);
    }

    :deep(input:checked ~ .track .handle) {
      background-color: var(--color-primary-normal);
    }
  }
}
</style>
