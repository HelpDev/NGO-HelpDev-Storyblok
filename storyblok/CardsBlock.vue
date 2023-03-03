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
  margin: 0 auto;

  &__row {
    flex-wrap: wrap;
    justify-content: center;
    padding: 1vw;
  }

  @media (--breakpoint-m) {
    padding: 0;
  }

  :deep(.card) {
    --min-height: 15rem;
    --max-height: 30vmax;
    --margin: 0.25rem;
    --full-width: calc(var(--width) - var(--margin) * 2);

    @media (--breakpoint-s) {
      --min-height: 35rem;
    }
  }
}
</style>
