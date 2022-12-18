<script setup>
import { Column, Container, Row, Spinner } from '@papanasi/vue';

const props = defineProps({ blok: Object });

const top = ref(`${(props.blok.height / props.blok.width) * 100}%`);
</script>

<template>
  <Container class="embed">
    <Row class="embed__row">
      <Column basic="content">
        <iframe
          class="embed__frame"
          :width="blok.width"
          :height="blok.height"
          :src="`${blok.src}&${blok.params}`"
          frameborder="0"
          marginwidth="0"
          marginheight="0"
          allowfullscreen
          scrolling="no"
          webkitallowfullscreen
          mozallowfullscreen
          msallowfullscreen
        >
        </iframe>

        <Spinner full="true" class="embed__spinner" variant="primary" />
      </Column>
    </Row>
  </Container>
</template>

<style scoped>
.embed {
  margin: 0 auto;

  &__row {
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding-top: v-bind(top);
    position: relative;
    margin-bottom: 1rem;
  }

  &__frame {
    position: relative;
    z-index: 1;
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    overflow: hidden;
  }

  &__spinner {
    z-index: 0;
  }
}
</style>
