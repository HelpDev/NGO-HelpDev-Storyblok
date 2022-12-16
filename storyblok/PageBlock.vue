<script setup>
defineProps({ blok: Object });
</script>

<template>
  <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
</template>
