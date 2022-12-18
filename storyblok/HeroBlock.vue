<script setup>
import { Column, Container, Row } from '@papanasi/vue';

defineProps({ blok: Object });
</script>

<template>
  <div class="hero">
    <Container
      v-editable="blok"
      :fluid="true"
      class="hero__container"
      :style="{ 'background-image': `url(${blok.image.filename})` }"
    >
      <Row basic="column" m="row">
        <Column class="hero__elements">
          <h1 class="hero__title">{{ blok.title }}</h1>
          <p class="hero__subtitle">{{ blok.subtitle }}</p>
        </Column>
      </Row>
    </Container>
  </div>
</template>

<style scoped>
.hero {
  --hero-height: 90vh;
  --background-from: var(--color-primary-normal);
  --background-to: var(--color-primary-dark);

  background-color: var(--background-from);
  background-image: linear-gradient(180deg, var(--background-from) 10%, var(--background-to) 100%);
  height: var(--hero-height);
  overflow: hidden;

  &__container {
    background-position: right center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 auto;
    height: var(--hero-height);
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (--breakpoint-s) {
      background-position: right top;
      background-size: contain;
    }
  }

  &__elements {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: calc(var(--hero-height) - var(--header-height-min));
    backdrop-filter: blur(1px);
    padding-bottom: 1rem;

    @media (--breakpoint-s) {
      height: calc(var(--hero-height) - var(--header-height));
    }

    @media (--breakpoint-l) {
      backdrop-filter: none;
    }
  }

  &__title {
    color: var(--color-basic-brightest);
    font-family: var(--font-family-heading);
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-bold);
    text-align: center;
    max-width: 80%;

    @media (--breakpoint-s) {
      font-size: var(--font-size-xxxl);
    }

    @media (--breakpoint-m) {
      max-width: 35rem;
    }
  }

  &__subtitle {
    color: var(--color-basic-brightest);
    font-size: var(--font-size-l);
    line-height: calc(var(--font-size-l) * 1.5);
    text-align: center;
    max-width: 80%;

    @media (--breakpoint-s) {
      font-size: var(--font-size-xl);
      line-height: calc(var(--font-size-xl) * 1.5);
      font-weight: var(--font-weight-light);
    }

    @media (--breakpoint-m) {
      max-width: 40rem;
    }
  }
}
</style>
