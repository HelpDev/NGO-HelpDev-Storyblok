<script setup>
import { Column, Container, Row } from "@papanasi/vue";

defineProps({ blok: Object });
</script>

<template>
  <div class="hero">
    <Container class="hero__container" v-editable="blok">
      <Row basic="column" m="row">
        <Column>
          <h1>{{ blok.title }}</h1>
          <p>{{ blok.subtitle }}</p>
        </Column>
        <Column> <img :src="blok.image.filename" :alt="blok.title" /> </Column>
      </Row>
    </Container>
  </div>
</template>

<style scoped>
.hero {
  background-color: var(--color-primary-300);
  background-image: linear-gradient(180deg, var(--color-primary-300) 10%, var(--color-primary-600) 100%);
}

.hero__container {
  margin: 0 auto;
}
</style>
