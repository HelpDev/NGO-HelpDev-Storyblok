<script setup>
import { useElementVisibility } from '@vueuse/core';
import Vue3Autocounter from 'vue3-autocounter';

const props = defineProps({ blok: Object });

const { data } = await useFetch(
  () => `https://raw.githubusercontent.com/tabler/tabler-icons/master/icons/${props.blok?.icon || 'question-mark'}.svg`
);

const title = ref(props.blok?.title);
const separator = ref('.');
const prefix = ref(props.blok?.prefix || '');
const suffix = ref(props.blok?.suffix || '');
const fromNumber = ref(Number(props.blok?.fromNumber) || 0);
const toNumber = ref(Number(props.blok?.toNumber));
const icon = ref(null);
const wasAnimated = ref(false);
const counterRef = ref(null);
const counterRefIsVisible = useElementVisibility(counterRef);

watchEffect(() => {
  const reader = new FileReader();

  reader.onload = () => {
    icon.value = reader.result;
  };

  reader.onerror = () => {
    console.error(`error rendering icon ${title.value}`);
  };

  reader.readAsText(data.value);
});

watch([() => counterRefIsVisible.value], (isVisible) => {
  function animateNumbersIfWhereNotAnimated() {
    if (!isVisible || wasAnimated.value) {
      return;
    }

    wasAnimated.value = true;
    counterRef.value.start();
  }

  animateNumbersIfWhereNotAnimated();
});
</script>

<template>
  <div v-if="icon" class="kpi">
    <div class="kpi__icon" v-html="icon"></div>
    <div class="kpi__info">
      <vue3-autocounter
        ref="counterRef"
        class="kpi__counter"
        :start-amount="fromNumber"
        :end-amount="toNumber"
        :prefix="prefix"
        :suffix="suffix"
        :duration="3"
        :separator="separator"
        :decimals="0"
        :autoinit="false"
      />

      <span class="kpi__title"> {{ title }} </span>
    </div>
  </div>
</template>

<style scoped>
.kpi {
  --size: 4rem;
  --counter-size: var(--font-size-xxl);

  display: flex;
  margin: 1rem;

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: calc(var(--size) - var(--counter-size) * 0.8);
  }

  &__title {
    width: 7rem;
    padding-top: 0.5rem;
    font-size: var(--font-size-l);
    font-weight: var(--font-weight-medium);
  }

  &__icon:deep(svg) {
    width: var(--size);
    height: var(--size);
  }

  &__icon:deep(path) {
    color: var(--color-primary-dark);
  }

  &__counter {
    font-size: var(--counter-size);
    font-weight: var(--font-weight-bold);
  }
}
</style>
