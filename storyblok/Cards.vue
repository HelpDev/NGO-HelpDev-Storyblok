<script setup>
import { Container, Row } from '@papanasi/vue';

defineProps({ blok: Object });
</script>

<template>
  <Container v-editable="blok" class="cards">
    <Row class="cards__row">
      <StoryblokComponent v-for="card in blok.cards" :key="card._uid" :blok="card" />
    </Row>
  </Container>
</template>

<style scoped>
.cards {
  margin: 2rem auto;

  &__row {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
