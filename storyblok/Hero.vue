<script setup>
import { Column, Container, Row } from "@papanasi/vue";

defineProps({ blok: Object });
</script>

<template>
  <Container v-editable="blok">
    <Row basic="column" m="row">
      <Column> Row 1 of 3 - Column 1 of 3 </Column>
      <Column> <img :src="blok.image.filename" :alt="blok.title" /> </Column>
    </Row>
  </Container>
</template>

<style scoped>
.pa-container {
  margin: 0 auto;
}
</style>
