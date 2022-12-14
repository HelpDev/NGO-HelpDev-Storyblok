<script setup>
import { Column, Container, Row } from '@papanasi/vue';

defineProps({ blok: Object });
</script>

<template>
  <div class="hero">
    <Container class="hero__container" v-editable="blok">
      <Row basic="column" m="row">
        <Column>
          <h1 class="hero__title">{{ blok.title }}</h1>
          <p class="hero__subtitle">{{ blok.subtitle }}</p>
        </Column>
        <Column> <img :src="blok.image.filename" :alt="blok.title" /> </Column>
      </Row>
    </Container>
  </div>
</template>

<style scoped>
.hero {
  background-color: var(--color-primary-darker);
  background-image: linear-gradient(180deg, var(--color-primary-normal) 10%, var(--color-primary-normal) 100%);

  &__container {
    margin: 0 auto;
  }

  &__title {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-xxxl);
    font-weight: var(--font-weight-black);
  }
}
</style>
