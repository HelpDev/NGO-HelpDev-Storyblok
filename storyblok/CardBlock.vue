<script setup>
import { Button } from '@papanasi/vue';
import { CardSize, CardVariant } from '~/helpers';
const storyblokApi = useStoryblokApi();

const props = defineProps({ blok: Object });

const richtext = ref(storyblokApi.richTextResolver.render(props.blok.subtitle));
const width = ref(CardSize[props.blok.size].width);
const image = ref(props.blok?.image?.filename);
const padding = ref(CardSize[props.blok.size].padding);
const background = ref(CardVariant[props.blok.variant].background);
const foreground = ref(CardVariant[props.blok.variant].foreground);
const side = ref(props.blok.image_side);
const size = ref(side.value === 'center' ? 'cover' : '50%');
const align = ref(
  image.value && side.value !== 'center' ? 'flex-start' : props.blok.size !== '1' ? 'flex-start' : 'center'
);
const margin = image.value && side.value === 'left' ? `calc(50% + ${padding.value})` : '0';
const textWidth = ref(!image.value && props.blok.size !== '1' ? '100%' : '50%');
const maxHeight = ref(props.blok.size === '2' ? 'auto' : '20vmax');
</script>

<template>
  <div class="card" :style="{ 'background-image': `url(${image})` }">
    <h3 class="card__title">{{ blok.title }}</h3>
    <p class="card__subtitle" v-html="richtext"></p>

    <ul class="card__actions">
      <li v-for="element in blok.actions" :key="element._uid">
        <NuxtLink
          class="card__link"
          :target="element.link.target"
          :to="
            element.link.cached_url.includes('index')
              ? element.link.cached_url.replace('index', locale === 'en' ? '/' : '')
              : element.link.cached_url
          "
        >
          <Button class="card__button" :variant="element.variant || 'basic'">{{ element.title }}</Button>
        </NuxtLink>
      </li>
    </ul>
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
  --text-width: v-bind(textWidth);

  background-color: var(--background);
  background-position: center v-bind(side);
  background-size: v-bind(size);
  background-repeat: no-repeat;
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

  &__title,
  &__subtitle,
  &__actions {
    backdrop-filter: blur(1px);

    @media (--breakpoint-s) {
      margin-left: v-bind(margin);
      max-width: calc(var(--text-width) - var(--padding));
    }
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

  &__actions {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 2rem;
  }

  &__link {
    color: var(--color-basic-brightest);
    font-family: var(--font-family-heading);
    font-weight: var(--font-weight-medium);
    text-align: center;
    transition: color var(--transition-duration-normal);
    margin-right: 0.25rem;

    &:hover {
      color: var(--color-primary-brightest);
    }

    @media (--breakpoint-s) {
      margin-right: 0.5rem;
    }
  }
}
</style>
