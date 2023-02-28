<script setup>
import { Container, Row } from '@papanasi/vue';

const props = defineProps({ blok: Object });

const smaller = ref(props.blok?.smaller);
</script>

<template>
  <Container v-editable="blok" class="logos">
    <Row class="logos__row">
      <StoryblokComponent v-for="logo in blok.logos" :key="logo._uid" :blok="{ ...logo, smaller }" />
    </Row>
  </Container>
</template>

<style scoped>
.logos {
  margin: 0 auto;

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
