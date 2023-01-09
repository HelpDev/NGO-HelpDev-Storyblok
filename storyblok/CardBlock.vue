<script setup>
import { Button } from '@papanasi/vue';
import { CardImageSide, CardSize, CardVariant } from '~/helpers';
const storyblokApi = useStoryblokApi();

const props = defineProps({ blok: Object });

const cardSize = CardSize[props.blok.size];
const cardVariant = CardVariant[props.blok.variant];
const cardImageSide = CardImageSide[props.blok.image_side];

const richtext = ref(storyblokApi.richTextResolver.render(props.blok.subtitle));
const width = ref(cardSize.width);
const image = ref(props.blok?.image?.filename);
const imageDisplay = ref(image.value ? 'block' : 'none');
const padding = ref(cardSize.padding);
const background = ref(cardVariant.background);
const foreground = ref(cardVariant.foreground);
const direction = ref(image.value ? cardImageSide.direction : 'row');
const imageWidth = ref(image.value ? cardImageSide.width : '100%');
const imageHeight = ref(image.value ? cardImageSide.height : '0%');
const justify = ref(image.value ? cardImageSide.justify : 'flex-start');
const align = ref(image.value ? cardImageSide.align : 'center');
const position = ref(props.blok.image_side === 'center' ? 'absolute' : 'initial');
const maxHeight = ref(props.blok.size === '2' ? 'auto' : '20vmax');
const minHeightThumbnail = ref(!props.blok.title && richtext.value === '<p></p>' ? '35rem' : '50%');
</script>

<template>
  <div class="card">
    <div :style="{ 'background-image': `url(${image})` }" class="card__thumbnail"></div>
    <div class="card__info">
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
  --image-width: v-bind(imageWidth);
  --image-height: v-bind(imageHeight);

  background-color: var(--background);
  background-position: center v-bind(side);
  background-size: cover;
  background-repeat: no-repeat;
  color: var(--foreground);
  width: 100%;
  margin-top: 0.5rem;
  min-height: var(--min-height);
  max-height: var(--max-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (--breakpoint-m) {
    width: var(--full-width);
    margin-right: var(--margin);
    flex-direction: v-bind(direction);
    justify-content: v-bind(justify);
    align-items: v-bind(align);
  }

  &__info,
  &__thumbnail {
    height: v-bind(minHeightThumbnail);
    width: 100%;
    position: v-bind(position);

    @media (--breakpoint-m) {
      height: var(--image-height);
      width: var(--image-width);
    }
  }

  &__thumbnail {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: v-bind(imageDisplay);
  }

  &__info {
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    :deep(ul) {
      padding: 0;
    }

    :deep(p) {
      margin-bottom: 1rem;
    }
  }

  &__title,
  &__subtitle,
  &__actions {
    backdrop-filter: blur(1px);
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
