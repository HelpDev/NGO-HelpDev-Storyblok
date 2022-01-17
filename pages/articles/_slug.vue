<template>
  <section>
    <content-article :blok="story.content" />
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
  asyncData(context) {
    return loadPageContentFromApi(
      context,
      `cdn/stories/${context.localePath(`articles/${context.params.slug}`)}`
    );
  }
};
</script>
