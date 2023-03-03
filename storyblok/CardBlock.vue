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
const lightBoxVisible = ref(false);

function onClickImage() {
  lightBoxVisible.value = true;
}

function onHideLightbox() {
  lightBoxVisible.value = false;
}
</script>

<template>
  <div class="card">
    <div :style="{ 'background-image': `url(${image})` }" class="card__thumbnail" @click="onClickImage"></div>
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
  <vue-easy-lightbox class="card-modal" :visible="lightBoxVisible" :imgs="[image]" @hide="onHideLightbox">
    <template #toolbar="{}"> </template>
  </vue-easy-lightbox>
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: var(--min-height);
  margin-top: 0.5rem;
  overflow: hidden;
  color: var(--foreground);

  background-color: var(--background);
  background-repeat: no-repeat;
  background-position: center v-bind(side);
  background-size: cover;

  @media (--breakpoint-m) {
    flex-direction: v-bind(direction);
    align-items: v-bind(align);
    justify-content: v-bind(justify);
    width: var(--full-width);
    max-height: var(--max-height);
    margin-right: var(--margin);
    margin-left: var(--margin);
  }

  &__info,
  &__thumbnail {
    position: v-bind(position);
    z-index: 1;
    width: 100%;

    @media (--breakpoint-m) {
      width: var(--image-width);
      height: var(--image-height);
    }
  }

  &__thumbnail {
    z-index: 2;
    display: v-bind(imageDisplay);
    min-height: var(--min-height);
    cursor: zoom-in;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    @media (--breakpoint-m) {
      min-height: auto;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    max-width: 90%;
    padding: var(--padding);

    @media (--breakpoint-m) {
      max-width: 100%;
    }

    :deep(ul) {
      padding: 0;
    }

    :deep(p) {
      margin-bottom: 1rem;
    }
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

  &__subtitle {
    text-align: justify;

    :deep(h2) {
      margin: 0.5rem 0;
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-medium);
    }

    :deep(h3) {
      margin: 0.75rem 0 0.5rem 0;
      font-size: var(--font-size-l);
      font-weight: var(--font-weight-medium);
      color: var(--color-primary-dark);
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    padding: 0;
    padding-top: 2rem;
    margin-top: 0;
    margin-bottom: 0;
    list-style: none;
  }

  &__link {
    margin-right: 0.25rem;
    font-family: var(--font-family-heading);
    font-weight: var(--font-weight-medium);
    color: var(--color-basic-brightest);
    text-align: center;
    transition: color var(--transition-duration-normal);

    &:hover {
      color: var(--color-primary-brightest);
    }

    @media (--breakpoint-s) {
      margin-right: 0.5rem;
    }
  }
}
</style>
