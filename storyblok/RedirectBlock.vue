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

async function main() {
  const redirectUri = sessionStorage.getItem('currentUrl');

  if (redirectUri === history.state.current && history.state.back) {
    await navigateTo(history.state.back);

    return;
  }

  setTimeout(redirect, delay.value || 200);
}

await main();
</script>

<template>
  <div class="redirect">
    <div class="redirect__container">
      <Spinner variant="primary" :full="true" />
    </div>
  </div>
</template>

<style scoped>
.redirect {
  min-height: 70vh;

  &__container {
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
}
</style>
