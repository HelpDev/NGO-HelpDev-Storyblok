<script setup>
import mql from '@microlink/mql';

const props = defineProps({ blok: Object });

const url = ref(props.blok?.url?.url);
const smaller = ref(props.blok?.smaller);
const logoSize = ref(smaller.value ? '3rem' : '6rem');
const logoMargin = ref(smaller.value ? '0rem' : '1rem');

const src = ref(null);
const title = ref(null);
const backgroundImage = ref('none');

async function main() {
  const { data } = await mql(url.value);

  src.value = data?.logo?.url || data?.image?.url;
  title.value = data?.title || data?.publisher;
  backgroundImage.value = `url(${src.value})`;

  title.value = props.blok?.defaultTitle || title.value?.replace(/ ?(\||-).*/g, '');
  backgroundImage.value = props.blok?.defaultImage?.filename
    ? `url(${props.blok?.defaultImage?.filename})`
    : backgroundImage.value;
}

main();
</script>

<template>
  <div v-if="src" class="logo">
    <a :href="url" target="_blank" rel="noreferrer" class="logo__title">
      <span class="logo__image"></span>
      {{ smaller ? '' : title }}
    </a>
  </div>
</template>

<style scoped>
.logo {
  --logo-margin: v-bind(logoMargin);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;

  @media (--breakpoint-s) {
    margin: 1rem calc(1rem + var(--logo-margin) * 2);
  }

  @media (--breakpoint-m) {
    margin: 1rem calc(1rem + var(--logo-margin) * 3);
  }

  @media (--breakpoint-l) {
    margin: 1rem calc(1rem + var(--logo-margin) * 4);
  }

  &__image {
    --size: v-bind(logoSize);

    display: block;
    width: var(--size);
    max-width: 100%;
    height: calc(var(--size) * 0.8);
    margin-bottom: 0.5rem;
    background-image: v-bind(backgroundImage);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-medium);
    text-align: center;
    cursor: pointer;
    filter: saturate(0.25);
    transition: filter;
    transition-duration: var(--transition-duration-normal);

    &:hover,
    &:active {
      text-decoration: none;
      filter: saturate(1);
    }
  }
}
</style>
