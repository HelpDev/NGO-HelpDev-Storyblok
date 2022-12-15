<script setup>
const props = defineProps({ blok: Object });

const size = ref(props.blok.size);
</script>

<template>
  <div class="card">{{ blok.title }} {{ blok.size }}</div>
</template>

<style scoped>
.card {
  --margin: 0.5rem;
  --size: v-bind(size);

  background: red;
  width: calc(var(--size) - var(--margin) * 2);
  height: 4rem;
  margin: 0.5rem;
}
</style>
