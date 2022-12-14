<script setup>
import { Container } from '@papanasi/vue';

defineProps({ blok: Object });
</script>

<template>
  <Container :fluid="true" v-editable="blok">
    <Header />
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
  </Container>
</template>
