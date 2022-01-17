<template>
  <section class="flex flex-grow">
    <content-project :blok="story.content" />
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
      `cdn/stories/${context.localePath(`projects/${context.params.slug}`)}`
    );
  }
};
</script>
