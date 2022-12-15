<script setup>
const props = defineProps({ blok: Object });

const variantColors = {
  basic: {
    background: 'var(--color-basic-brighter)',
    foreground: 'var(--color-basic-darkest)'
  },
  primary: {
    background: 'var(--color-primary-bright)',
    foreground: 'var(--color-primary-darkest)'
  },
  secondary: {
    background: 'var(--color-secondary-bright)',
    foreground: 'var(--color-secondary-darkest)'
  },
  tertiary: {
    background: 'var(--color-tertiary-bright)',
    foreground: 'var(--color-tertiary-darkest)'
  }
};

const sizes = {
  1: {
    width: '100%',
    padding: '6%'
  },
  '1/2': {
    width: '50%',
    padding: '4%'
  },
  '1/3': {
    width: '33.333333%',
    padding: '3%'
  },
  '1/4': {
    width: '25%',
    padding: '3%'
  }
};

const width = ref(sizes[props.blok.size].width);
const image = ref(props.blok?.image?.filename);
const padding = ref(sizes[props.blok.size].padding);
const background = ref(variantColors[props.blok.variant].background);
const foreground = ref(variantColors[props.blok.variant].foreground);
const side = ref(props.blok.image_side);
const size = ref(side.value === 'center' ? 'cover' : '50%');
const align = ref(image.value && side.value !== 'center' ? 'flex-start' : 'center');
const margin = image.value && side.value === 'left' ? `calc(50% + ${padding.value})` : '0';
</script>

<template>
  <div class="card" :style="{ 'background-image': `url(${image})` }">
    <h3 class="card__title">{{ blok.title }}</h3>
    <p class="card__subtitle">{{ blok.subtitle }}</p>
  </div>
</template>

<style scoped>
.card {
  --margin: 0.5rem;
  --width: 100%;
  --padding: v-bind(padding);
  --background: v-bind(background);
  --foreground: v-bind(foreground);

  background-color: var(--background);
  background-position: center v-bind(side);
  background-size: v-bind(size);
  background-repeat: no-repeat;
  color: var(--foreground);
  width: var(--width);
  padding: var(--padding);
  margin-top: 0.5rem;
  height: 35rem;
  max-height: 30vmax;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: v-bind(align);

  @media (--breakpoint-m) {
    --width: v-bind(width);
    width: calc(var(--width) - var(--margin) * 2);
    margin-right: 0.5rem;
  }

  &__title,
  &__subtitle {
    margin-left: v-bind(margin);
    max-width: calc(50% - var(--padding));
  }

  &__title {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);

    @media (--breakpoint-s) {
      font-size: var(--font-size-xxl);
    }
  }
}
</style>
