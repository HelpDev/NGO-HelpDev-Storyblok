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
  height: var(--hero-height);
  margin-bottom: 1vw;
  overflow: hidden;

  background-color: var(--background-from);
  background-image: linear-gradient(180deg, var(--background-from) 10%, var(--background-to) 100%);

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: var(--hero-height);
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: right center;
    background-size: cover;

    @media (--breakpoint-s) {
      background-position: right top;
      background-size: contain;
    }
  }

  &__elements {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(var(--hero-height) - var(--header-height-min));
    padding-bottom: 1rem;
    backdrop-filter: blur(1px);

    @media (--breakpoint-s) {
      height: calc(var(--hero-height) - var(--header-height));
    }

    @media (--breakpoint-l) {
      backdrop-filter: none;
    }
  }

  &__title {
    max-width: 80%;
    font-family: var(--font-family-heading);
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-bold);
    line-height: var(--font-size-xxl);
    color: var(--color-basic-brightest);
    text-align: center;
    filter: drop-shadow(2px 2px 0 var(--background-from));

    @media (--breakpoint-s) {
      font-size: var(--font-size-xxxxl);
      line-height: var(--font-size-xxxxl);
    }

    @media (--breakpoint-m) {
      max-width: 35rem;
      filter: none;
    }
  }

  &__subtitle {
    max-width: 80%;
    font-size: var(--font-size-l);
    line-height: calc(var(--font-size-l) * 1.5);
    color: var(--color-basic-brightest);
    text-align: center;
    filter: drop-shadow(1px 1px 0 var(--background-from));

    @media (--breakpoint-s) {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-light);
      line-height: calc(var(--font-size-xl) * 1.5);
    }

    @media (--breakpoint-m) {
      filter: none;
    }

    @media (--breakpoint-m) {
      max-width: 40rem;
    }
  }
}
</style>
