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
  asyncData(context) {
    return loadPageContentFromApi(
      context,
      `cdn/stories/${context.localePath('team')}`
    );
  }
};
</script>
