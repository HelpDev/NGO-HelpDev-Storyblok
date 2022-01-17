<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    />
  </section>
</template>

<script>
import {
  onStoryBridgeInputChangeUpdateContent,
  onStoryBridgeChangedToPublishedRefreshPage,
  loadPageContentFromApi
} from '~/helpers';

export default {
  data() {
    return {
      story: { content: {} }
    };
  },
  mounted() {
    onStoryBridgeInputChangeUpdateContent(this);
    onStoryBridgeChangedToPublishedRefreshPage(this);
  },
  async fetch(context) {
    // Loading reference data - Articles in our case
    if (context.store.state.articles.loaded !== '1') {
      let articlesRefRes = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with: context.localePath('articles/'),
        version: 'published'
      });
      context.store.commit('articles/setArticles', articlesRefRes.data.stories);
      context.store.commit('articles/setLoaded', '1');
    }
  },
  asyncData(context) {
    return loadPageContentFromApi(
      context,
      `cdn/stories/${context.localePath('home')}`
    );
  }
};
</script>
