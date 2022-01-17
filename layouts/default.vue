<template>
  <div class="min-h-screen flex flex-col font-sans">
    <Header />
    <main class="px-2 lg:px-0 min-h-screenx1.5">
      <Nuxt />
    </main>
    <Footer />
    <Donations />
  </div>
</template>

<script>
import Header from '~/components/layout/Header.vue';
import Footer from '~/components/layout/Footer.vue';
import Donations from '~/components/layout/Donations.vue';

export default {
  components: {
    Header,
    Footer,
    Donations
  }
};
</script>
