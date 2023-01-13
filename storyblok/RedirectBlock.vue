<script setup>
import { Spinner } from '@papanasi/vue';

const props = defineProps({ blok: Object });

const to = ref(props.blok.to);
const delay = ref(Number(props.blok.delay || 0));
const code = ref(Number(props.blok.code || 302));

async function redirect() {
  await navigateTo(to.value.url, {
    external: to.value.linktype === 'url',
    redirectCode: code.value
  });
}

if (delay.value) {
  setTimeout(redirect, delay.value);
} else {
  await redirect();
}
</script>

<template>
  <div class="redirect">
    <Spinner variant="primary" :full="true" />
  </div>
</template>

<style scoped>
.redirect {
  position: absolute;
  height: 10rem;
  width: 80vw;
  bottom: 30vh;
  left: 10vw;
  border-radius: 0.5rem;
  overflow: hidden;

  @media (--breakpoint-s) {
    width: 60vw;
    left: 20vw;
  }
}
</style>
