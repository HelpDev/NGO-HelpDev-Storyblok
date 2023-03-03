<script setup>
import { Container, Row } from '@papanasi/vue';

defineProps({ blok: Object });
</script>

<template>
  <Container v-editable="blok" class="kpis">
    <Row class="kpis__row">
      <StoryblokComponent v-for="kpi in blok.kpis" :key="kpi._uid" :blok="kpi" />
    </Row>
  </Container>
</template>

<style scoped>
.kpis {
  max-width: 80rem;
  margin: 0 auto;

  &__row {
    flex-wrap: wrap;
    justify-content: center;
    padding: 1vw;
  }

  @media (--breakpoint-m) {
    padding: 0;
  }
}
</style>
