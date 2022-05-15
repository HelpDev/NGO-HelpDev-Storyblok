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
  loadMenuFromApi,
  loadPageContentFromApi,
  onStoryBridgeChangedToPublishedRefreshPage,
  onStoryBridgeInputChangeUpdateContent
} from 'components-helpdev-storyblok/helpers/common-page.helper';

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
  async asyncData(context) {
    await loadMenuFromApi(context);

    return loadPageContentFromApi(
      context,
      `cdn/stories/${context.localePath('home')}`
    );
  }
};
</script>
