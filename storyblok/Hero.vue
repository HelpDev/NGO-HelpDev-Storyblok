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

  background-color: var(--color-primary-darker);
  background-image: linear-gradient(180deg, var(--color-primary-normal) 10%, var(--color-primary-normal) 100%);
  height: var(--hero-height);
  overflow: hidden;

  &__container {
    background-position: 175% top;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 0 auto;
    padding-top: var(--header-height);
    height: var(--hero-height);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__elements {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: calc(var(--hero-height) - var(--header-height));
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
    font-size: var(--font-size-m);
    line-height: calc(var(--font-size-m) * 1.5);
    text-align: center;
    max-width: 80%;

    @media (--breakpoint-s) {
      font-size: var(--font-size-l);
      line-height: calc(var(--font-size-l) * 1.5);
    }

    @media (--breakpoint-m) {
      max-width: 40rem;
    }
  }
}
</style>
