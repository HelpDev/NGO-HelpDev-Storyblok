<script setup>
import mql from '@microlink/mql';
const props = defineProps({ blok: Object });

const url = ref(props.blok?.url?.url);

const src = ref(null);
const title = ref(null);
const backgroundImage = ref('none');

async function main() {
  const { data } = await mql(url.value);

  src.value = data?.logo?.url || data?.image?.url;
  title.value = data?.title || data?.publisher;
  backgroundImage.value = `url(${src.value})`;
}

main();
</script>

<template>
  <div v-if="src" class="logo">
    <div class="logo__image"></div>
    <a :href="url" target="_blank" rel="noreferrer" class="logo__title">{{ title }}</a>
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  @media (--breakpoint-s) {
    margin: 1rem 3rem;
  }

  @media (--breakpoint-m) {
    margin: 1rem 4rem;
  }

  @media (--breakpoint-l) {
    margin: 1rem 6rem;
  }

  &__image {
    --size: 6rem;

    background-image: v-bind(backgroundImage);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: var(--size);
    height: calc(var(--size) * 0.8);
    max-width: 100%;
    margin-bottom: 0.5rem;
  }

  &__title {
    font-weight: bold;
  }
}
</style>
