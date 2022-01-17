<template>
  <section>
    <h2 class="py-10 text-center font-bold text-4xl">Articles Overview</h2>
    <ul class="flex py-6 mb-6">
      <li
        v-for="article in stories"
        :key="article._uid"
        class="flex-auto px-6"
        style="min-width: 33%"
      >
        <article-teaser
          v-if="article.content"
          :article-link="`/${article.full_slug}`"
          :article-content="article.content"
        />
        <p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">
          This content loads on save. <strong>Save the entry & reload.</strong>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
import { loadPageContentFromApi } from '~/helpers';

export default {
  data() {
    return {
      stories: []
    };
  },
  asyncData(context) {
    return loadPageContentFromApi(
      context,
      'cdn/stories',
      context.localePath('articles/')
    );
  }
};
</script>
