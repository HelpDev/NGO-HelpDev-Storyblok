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
    justify-content: center;
    flex-wrap: wrap;
    padding: 2vw;
  }

  @media (--breakpoint-m) {
    padding: 0;
  }

  :deep(.card) {
    --min-height: 35rem;
    --max-height: 30vmax;
    --margin: 0.5rem;
    --full-width: calc(var(--width) - var(--margin) * 2);
  }
}
</style>
