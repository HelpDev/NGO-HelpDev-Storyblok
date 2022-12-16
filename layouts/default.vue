<script setup>
import { Container } from '@papanasi/vue';
</script>

<template>
  <Container :fluid="true">
    <Header />
    <slot />
    <Footer />
  </Container>
</template>
