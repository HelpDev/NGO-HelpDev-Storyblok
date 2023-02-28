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
  margin: 0 auto;
  max-width: 80rem;

  &__row {
    justify-content: center;
    flex-wrap: wrap;
    padding: 1vw;
  }

  @media (--breakpoint-m) {
    padding: 0;
  }
}
</style>
